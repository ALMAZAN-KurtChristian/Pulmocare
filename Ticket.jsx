import { useNavigate } from 'react-router-dom'; 
import ArrowBack from "@mui/icons-material/ArrowBack";
import './Ticket.scss'; 
import KEY from './IMAGES/FORGOT/KEY.png';
import Footer from './Footer';
import Navbar_user from "./Navbar_user";
import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';
function Ticket() {
  
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Effect to listen for changes in authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set currentUser state
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const handleReturn = () => {
    navigate("/Landing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedOption || !inputValue) {
      // Handle validation error, e.g., show an alert
      return;
    }
  
    console.log("Submitting form...");
    console.log("Selected Option:", selectedOption);
    console.log("Input Value:", inputValue);
  
    try {
      // Access the Ticketing collection through the initialized Firestore instance (db)
      const userAuth = getAuth();
      const currentUser = userAuth.currentUser;
  
      // Get the current user's student ID
      let studentId;
      if (currentUser) {
        // Assuming the student ID is stored in the "verified_users" collection
        const userDocRef = doc(db, 'verified_users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          studentId = userData.studentId; // Assuming the student ID field is named "studentId"
        } else {
          // Handle the case where the user document does not exist
          console.error("User document does not exist.");
          return;
        }
      } else {
        // Handle the case where the user is not signed in
        console.error("No current user found.");
        return;
      }
  
      // Add the ticket data to the Firestore collection
      await addDoc(collection(db, 'Ticketing'), {
        option: selectedOption,
        value: inputValue,
        email: currentUser ? currentUser.email : null, // Retrieve user's email
        studentId: studentId, // Use the retrieved student ID
      });
  
      console.log("Form data submitted successfully.");
  
      // Reset form fields after successful submission
      setSelectedOption('');
      setInputValue('');
  
      // Optionally, navigate to a success page or show a success message
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error, e.g., show an alert
    }
  };
  
  

  return (
    <div>
      <div className="bg_forgot">
        <div>
          <Navbar_user />
          <div className="contain">
            <img src={KEY} alt='top' className='keyimg' />
            <h1 id="h1-f">Want to Change Contact Information ? <br /><span id="text">No Worries! Just Send a Ticket </span></h1>
            <span id="text">Please select Option: </span>
            <form onSubmit={handleSubmit} >
              <div>
                <select
                  name="changeOption"
                  id="changeOption"
                  className="dropdown"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value="age">Change Age</option>
                  <option value="contact">Change Contact</option>
                  <option value="course">Change Course</option>
                  <option value="email">Change Email</option>
                  <option value="firstName">Change Firstname</option>
                  <option value="gender">Change Gender</option>
                  <option value="lastName">Change Lastname</option>
                  <option value="studentId">Change Student ID</option>
                  <option value="yearLevel">Change Year Level</option>
                </select>
              </div>
              <div className="mail">
                <input
                  placeholder='Change information into'
                  name="email"
                  id='input-f'
                  style={{
                    height: '1vh', // Adjust the height as needed
                    width: '25vh', // Adjust the width as needed
                    marginLeft: '1.5vh', // Adjust the left margin as needed
                    padding: '0.5vh', // Adjust the padding as needed
                    fontSize: '2vh', // Adjust the font size of the placeholder text
                    color: 'gray' // Adjust the color of the placeholder text
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button_submit">Submit</button>
              </div>
            </form>

            <div className="back-button-container">
              <ArrowBack className='icon2' style={{
                height: '3vh', // Adjust the height as needed
                width: '3vh', // Adjust the width to maintain aspect ratio
                margin: '0 .7vh', // Adjust the margin as needed
                marginLeft: '-1vh' // Adjust the left margin as needed
              }}/>
              <span className="button_back" onClick={handleReturn}>Back To Landing</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ticket;
