import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import bot from './IMAGES/ASSESSMENT/AssessmentBot.png';
import "./AssessmentForm.scss";
import firebase from 'firebase/compat/app';
import Navbar_user from './Navbar_user';
import 'firebase/compat/firestore';

const UserAssessmentForm = () => {
    const [currentCategory, setCurrentCategory] = useState('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [animationComplete, setAnimationComplete] = useState(false);

    // Initialize Firestore
    const firestore = firebase.firestore();

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        try {
          const userDocRef = doc(db, 'verified_users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserProfile(userData);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log('Main - userProfile:', userProfile);

    const questionsByCategory = {
        intro: [
            "Hello! This will serve as your minor pulmonary assessment. Click start when you're ready!"],
        wheezing: [
            "Are you experiencing wheezing? (Wheezing is a whistling or high-pitched sound that happens when you breathe).",
            "Does it happen when you exhale or inhale?",
            "What are the triggers or things that worsen the experience?",
        ],
        coughing: [
            "Do you experience any coughing?",
            "How long have you had the cough?",
            "Is it a dry cough or is there phlegm involved?",
            "If there's a presence of phlegm, describe its color:",
        ],
        shortnessOfBreath: [
            "Do you experience any shortness of breath? (It is a feeling like you can't get enough air into your lungs or that it's hard to breathe)",
            "How long have you been having shortness of breath?",
            "How would you describe the severity?",
            "What are the triggers or things that make the experience worse?",
        ],
        chestPain: [
            "Do you feel any chest pain? Any discomfort or pain felt in the chest area will do.",
            "Can you specify the location or spot where the pain is?",
            "How would you describe the pain?",
        ],
        hemoptysis: [
            "When you cough, is there blood involved?",
            "Describe the severity of it",
            "Describe the amount of the blood you cough up:"
        ],
        confirm: [
            "Please review you responses. Are you sure you want to submit?"
        ]
    };

    const handleNextQuestion = (response) => {
        const categoryQuestions = questionsByCategory[currentCategory];
        const currentQuestion = categoryQuestions[currentQuestionIndex];
        
        // Save the response
        setResponses(prevResponses => ({
            ...prevResponses,
            [currentQuestion]: response
        }));
        
        if (response === 'No' && currentQuestionIndex === 0) {
            // If the user selects "No" for the first question, move to the next category
            const categories = Object.keys(questionsByCategory);
            const currentCategoryIndex = categories.indexOf(currentCategory);
            if (currentCategoryIndex + 1 < categories.length) {
                setCurrentCategory(categories[currentCategoryIndex + 1]);
                setCurrentQuestionIndex(0); // Reset the question index for the new category
                setShowQuestion(true); // Show the question for the new category
                return; // Exit the function early
            }  else {
                // End of form
                setConfirmation(true); // Set confirmation state to true
                return;
            }
        }
    
        // Proceed to the next question within the same category or move to the next category
        if (currentQuestionIndex + 1 < categoryQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Move to the next category or end of form
            const categories = Object.keys(questionsByCategory);
            const currentCategoryIndex = categories.indexOf(currentCategory);
            if (currentCategoryIndex + 1 < categories.length) {
                setCurrentCategory(categories[currentCategoryIndex + 1]);
                setCurrentQuestionIndex(0);
            } else {
                // End of form
                setConfirmation(true); // Set confirmation state to true
            }
        }

        if (currentCategory === 'hemoptysis' && currentQuestionIndex === 0 && response === 'No') {
            setCurrentQuestionIndex(categoryQuestions.length); // Skip to the end of the category
            setConfirmation(true);
        }    
    };

    const resetForm = () => {
        setCurrentCategory('wheezing');
        setCurrentQuestionIndex(0);
        setResponses({});
        setShowSubmitButton(false);
        setConfirmation(false);
        setCurrentQuestion('');

        const allButtons = document.querySelectorAll('button[type="button"]');
        allButtons.forEach(button => button.classList.remove('selected'));
    };

    const submitForm = async () => {
        try {
          const currentDate = new Date();
          // Prepare an object to hold the formatted responses by categories
          const formattedResponses = {};
          // Define the custom order of categories
          const categoryOrder = ['wheezing', 'coughing', 'shortnessOfBreath', 'chestPain', 'hemoptysis'];
          
          const fullName = `${userProfile.firstName} ${userProfile.lastName}`;
          const email = userProfile.email;
      
          const studentId = userProfile.studentId;
      
          // Iterate over the responses object and categorize the responses
          Object.keys(responses).forEach(question => {
            // Determine the category of the question
            const category = Object.keys(questionsByCategory).find(category => questionsByCategory[category].includes(question));
            // If the category exists, add the response to the formatted responses object
            if (category) {
              if (!formattedResponses[category]) {
                formattedResponses[category] = [];
              }
              formattedResponses[category].push(`${question}: ${responses[question]}`);
            }
          });
      
          // Sort the formatted responses by the custom order of categories
          const sortedResponses = {};
          categoryOrder.forEach(category => {
            if (formattedResponses[category]) {
              sortedResponses[category] = formattedResponses[category];
            }
          });
      
          resetForm();
          alert('Form submitted successfully!');
      
          const userId = userProfile.uid;
      
          await firestore.collection('verified_users').doc(userId).collection('User_submission').add({
            studentId,
            date: currentDate,
            responses: sortedResponses,
            fullName: fullName,
            email: email // Include the user's email in the form submission
          });
      
          await firestore.collection('Form_submissions').add({
            studentId,
            date: currentDate,
            responses: sortedResponses,
            fullName: fullName,
            email: email // Include the user's email in the form submission
          });
      
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form. Please try again.');
        }
      };
    

    const stringifyObject = (obj) => {
        try {
            return JSON.stringify(obj);
        } catch (error) {
            console.error('Error stringifying object:', error);
            return 'Error: Unable to stringify object';
        }
    };

    const TypingAnimation = ({ text }) => {
        const [displayText, setDisplayText] = useState('');
    
        useEffect(() => {
            let index = 0;
            const intervalId = setInterval(() => {
                setDisplayText(text.substring(0, index));
                index++;
                if (index > text.length) {
                    clearInterval(intervalId);
                }
            }, 40); 
    
            return () => clearInterval(intervalId); 
        }, [text]);
    
        return <p>{displayText}</p>;
    };

    useEffect(() => {
        const animateQuestion = () => {
            setShowQuestion(true);
            setAnimationComplete(false); 
            let index = 0;
            const questionText = questionsByCategory[currentCategory][currentQuestionIndex];
            const intervalId = setInterval(() => {
                setCurrentQuestion(questionText.substring(0, index));
                index++;
                if (index > questionText.length) {
                    clearInterval(intervalId); // Stop the animation when the entire question is displayed
                    setShowQuestion(true); // Show the entire question
                    setTimeout(() => {
                        setAnimationComplete(true); // Set animation complete state after 1 second delay
                    }, 1000); // Delay of 1 second
                }
            }, 40); // Speed
        };

        animateQuestion(); 
    }, [currentQuestionIndex, currentCategory]);

    return (
        <div className="AssessmentForm">
            <Navbar_user />
            <h2>User Symptom Assessment</h2>
            <img src={bot} alt="side image" className="assessmentbot" />
            <form>
                {currentCategory && (
                    <div>
                        {currentCategory === 'intro' && (
                    <div>
                        <TypingAnimation text="Hello! This will serve as your minor pulmonary assessment. Click start when you're ready!" />
                        <button type="button" onClick={() => setCurrentCategory('wheezing')}>Start</button>
                    </div>
                        )}
                        {currentCategory === 'wheezing' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Yes")}>Yes</button>
                                        <button type="button" onClick={() => handleNextQuestion("No")}>No</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {currentCategory === 'wheezing' && currentQuestionIndex === 1 && (
                             <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Exhale")}>Exhale</button>
                                        <button type="button" onClick={() => handleNextQuestion("Inhale")}>Inhale</button>
                                        <button type="button" onClick={() => handleNextQuestion("Both (Continuous)")}>Both or Continuous</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {currentCategory === 'wheezing' && currentQuestionIndex === 2 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Allergens")}>Allergens</button>
                                        <button type="button" onClick={() => handleNextQuestion("Cold Air")}>Cold Air</button>
                                        <button type="button" onClick={() => handleNextQuestion("Other")}>Other</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'coughing' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Yes")}>Yes</button>
                                        <button type="button" onClick={() => handleNextQuestion("No")}>No</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'coughing' && currentQuestionIndex === 1 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Acute or Mild (less than 3 weeks)")}>Acute or Mild (less than 3 weeks)</button>
                                        <button type="button" onClick={() => handleNextQuestion("Subacute or Moderate (3-8 weeks)")}>Subacute or Moderate (3-8 weeks)</button>
                                        <button type="button" onClick={() => handleNextQuestion("Chronic or Severe (more than 8 weeks)")}>Chronic or Severe (more than 8 weeks)</button>
                                    </div>
                                 )}
                        </div>
                        )}
                        {currentCategory === 'coughing' && currentQuestionIndex === 2 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Dry")}>Dry</button>
                                        <button type="button" onClick={() => handleNextQuestion("With Phlegm")}>With Phlegm</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'coughing' && currentQuestionIndex === 3 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <input type="text" id="response" placeholder="Type here..." />
                                        <button type="button" onClick={() => handleNextQuestion(document.getElementById("response").value)}>Next</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'shortnessOfBreath' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Yes")}>Yes</button>
                                        <button type="button" onClick={() => handleNextQuestion("No")}>No</button>
                                    </div>
                            )}
                        </div>
                        )}
                        {currentCategory === 'shortnessOfBreath' && currentQuestionIndex === 1 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Acute (less than 3 weeks)")}>Acute (less than 3 weeks)</button>
                                        <button type="button" onClick={() => handleNextQuestion("Subacute (3-8 weeks)")}>Subacute (3-8 weeks)</button>
                                        <button type="button" onClick={() => handleNextQuestion("Chronic (more than 8 weeks)")}>Chronic (more than 8 weeks)</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'shortnessOfBreath' && currentQuestionIndex === 2 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                <div>
                                    <button type="button" onClick={() => handleNextQuestion("Mild")}>Mild</button>
                                    <button type="button" onClick={() => handleNextQuestion("Moderate")}>Moderate</button>
                                    <button type="button" onClick={() => handleNextQuestion("Severe")}>Severe</button>
                                </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'shortnessOfBreath' && currentQuestionIndex === 3 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <input type="text" id="response" placeholder="Type here..." />
                                        <button type="button" onClick={() => handleNextQuestion(document.getElementById("response").value)}>Next</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'shortnessOfBreath' && currentQuestionIndex === 4 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Position")}>Position</button>
                                        <button type="button" onClick={() => handleNextQuestion("Exertion")}>Activities</button>
                                        <button type="button" onClick={() => handleNextQuestion("Time of Day")}>Time of Day</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'chestPain' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Yes")}>Yes</button>
                                        <button type="button" onClick={() => handleNextQuestion("No")}>No</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'chestPain' && currentQuestionIndex === 1 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <input type="text" id="response" placeholder="Type here..." />
                                        <button type="button" onClick={() => handleNextQuestion(document.getElementById("response").value)}>Next</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'chestPain' && currentQuestionIndex === 2 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Sharp")}>Sharp</button>
                                        <button type="button" onClick={() => handleNextQuestion("Dull")}>Dull</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'hemoptysis' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Yes")}>Yes</button>
                                        <button type="button" onClick={() => handleNextQuestion("No")}>No</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'hemoptysis' && currentQuestionIndex === 1 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Mild")}>Mild</button>
                                        <button type="button" onClick={() => handleNextQuestion("Moderate")}>Moderate</button>
                                        <button type="button" onClick={() => handleNextQuestion("Severe")}>Severe</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'hemoptysis' && currentQuestionIndex === 2 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button type="button" onClick={() => handleNextQuestion("Streaks")}>Streaks</button>
                                        <button type="button" onClick={() => handleNextQuestion("Cups")}>Cups</button>
                                    </div>
                                )}
                        </div>
                        )}
                        {currentCategory === 'confirm' && currentQuestionIndex === 0 && (
                            <div>
                                {showQuestion && (
                                    <p className={`question ${showQuestion ? 'show' : ''}`}>
                                        {currentQuestion.split('').map((char, index) => (
                                            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>{char}</span>
                                        ))}
                                    </p>
                                )}
                                {animationComplete && (
                                    <div>
                                        <button onClick={submitForm}>Submit</button>
                                        <button onClick={resetForm}>Reset</button>
                                    </div>
                                )}
                        </div>
                        )}
                    </div>
                )}
            </form>
            {confirmation && (
                <div className="confirmation">
                    <p>Please review your responses. Are you sure you want to submit?</p>
                    <button onClick={submitForm}>Submit</button>
                    <button onClick={resetForm}>Reset</button>
                </div>
            )}
            <div className='responsestext'>
                <h3>Responses</h3>
                {Object.keys(responses).map(question => (
                    <div key={question}>
                        <strong>{question}</strong>: {typeof responses[question] === 'object' ? stringifyObject(responses[question]) : responses[question]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAssessmentForm;

