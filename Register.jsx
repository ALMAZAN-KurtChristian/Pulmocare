import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import swal from 'sweetalert2'; // You can use a library like SweetAlert for the pop-up
import 'sweetalert2/dist/sweetalert2.min.css'; // Import the SweetAlert CSS
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import R2 from './IMAGES/REGISTER/R2.png'
import R1 from './IMAGES/REGISTER/R1.png'
import R3 from './IMAGES/REGISTER/R3.png'
import rdeg1 from './IMAGES/REGISTER/rdeg1.png'
import rdeg2 from './IMAGES/REGISTER/rdeg2.png'
import rdeg3 from './IMAGES/REGISTER/rdeg3.png'
import rdeg4 from './IMAGES/REGISTER/rdeg4.png'


const HorizontalLineWithText1 = ({ text, createColor, accountsColor }) => {
  const [firstPart, secondPart] = text.split(' ');

  return (
    <div className="horizontal-line-user">
      <div className="line-user"></div>
      <div className="line-text-user">
        <span style={{ color: createColor, fontSize: '4vh' }}>{firstPart}</span>
        <span style={{ color: accountsColor, fontSize: '4vh' }}>{secondPart}</span>
      </div>
      <div className="line-user" style={{ color: createColor }}></div>
    </div>
  );
};

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentId, setStudentId] = useState(''); // Step 1: Add Student ID state
  const [termsChecked, setTermsChecked] = useState(true); // Added state for terms checkbox

  const loginHandler = () => {
    navigate('/login');
  };

  const mainHandler = () => {
    navigate('/');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      age.trim() === '' ||
      gender.trim() === '' ||
      yearLevel.trim() === '' ||
      course.trim() === '' ||
      studentId.trim() === ''
    ) {
      alert('All fields are required');
      return;
    }
    
    if (!termsChecked) { // Check if terms checkbox is checked
      alert('Please accept the terms and conditions');
      return;
    }

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName)) {
      alert('First name should only contain letters.');
      return;
    }

    if (!nameRegex.test(lastName)) {
      alert('Last name should only contain letters.');
      return;
    }

    // Rest of your validation checks for password, email, contact, etc.

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Display a pop-up for email confirmation
      swal.fire({
        title: 'Email Verification',
        text: 'A confirmation email has been sent to your email address. Please click the verification link to activate your account.',
        icon: 'success',
      });

      // Clear form fields
      setFirstName('');
      setLastName('');
      setContact('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);

      // The user data is stored in Firestore as 'unverified'
      const userDocRef = doc(db, 'unverified_users', user.uid);
      await setDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        email: email,
        gender: gender,
        age: age,
        course: course,
        yearLevel: yearLevel,
        studentId: studentId, // Include the Student ID in the document
      });

      // Sign the user out to prevent access until email is verified
      auth.signOut();
    } catch (error) {
      setError('Fatima Email is already in used');
    }
  };

  
  
  const handleContactInput = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to keep only numeric characters and update the state
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setContact(numericValue);
  };
  
  const [termsClicked, setTermsClicked] = useState(false);
  const [gender, setgender] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);


  return (
    <div className='log-container_create'>
      <div className='create_bg'>
        <a href="/" onClick={mainHandler}>
          <img src={R1} alt='main' className='bg-reg-1' />
        </a>
        <img src={rdeg4} alt='main1' className='bgdes1-reg' />
        <img src={rdeg2} alt='main2' className='bgdes2-reg' />
        <img src={rdeg1} alt='main3' className='bgdes3-reg' />
        <img src={rdeg3} alt='main4' className='bgdes4-reg' />
        <img src={R3} alt='main5' className='bg-reg-2' />
      </div>
        <div className="container_reg">
          <div className="header_reg">
            <h2>
              Welcome to <span className="pulmo-care_reg">PulmoCare,</span>
            </h2>
            <h2>Your Virtual Health Companion!</h2>
            <div>
            <img src={R2} alt="main6" className='bg-reg-3' />
            </div>
          </div>
          <HorizontalLineWithText1 text="Create Account" createColor="#66ABDA" accountsColor="#103e7b" />


        
          <div className="user_columns">

          <div className="user_reg">
                <input
                type="text"
                placeholder="Student ID" // Step 2: Add input field for Student ID
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>

            <div className="user_reg">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

      <div className="user_reg">
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div className="user_reg">
  <input
    type="text" 
    placeholder="Contact"
    value={contact}
    onChange={handleContactInput} 
    required
  />
  <span className="note">Note: Contact should only contain 11 numbers</span>
</div>

    <div className="user_reg">
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setgender(e.target.value)}
        required
      />
    </div>

    <div className="user_reg">
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
    </div>

    <div className="user_reg">
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
    </div>

    <div className="user_reg">
      <select
        value={yearLevel}
        onChange={(e) => setYearLevel(e.target.value)}
        required
      >
   
    <option value="1">First Year</option>
    <option value="2">Second Year</option>
    <option value="3">Third Year</option>
    <option value="4">Fourth Year</option>

  </select>
</div>


            <div className="user_reg">
              <input type="email" placeholder="Fatima email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="user_reg">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="user_reg">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          
      {/* Your JSX code */}
      <div className="check1">
        <input 
          type="checkbox" 
          id="termsAndConditions"  
          style={{ 
            
            marginRight: '1vh', 
            height: '2vh', 
            width: '2vh', 
            borderRadius: '0.5vh', 
            border: '.1vh solid #103e7b', 
          }} 
          required // Make the checkbox required
          checked={termsChecked} // Bind checked state to termsChecked
          onChange={(e) => setTermsChecked(e.target.checked)} // Update termsChecked state
        />
        <label htmlFor="termsAndConditions">
          <a
            href="Terms-And-Condition"
            target="_blank"
            onClick={() => setTermsClicked(true)}
            className={termsClicked ? 'visited-link' : ''}
          >
            Terms and Conditions
          </a>
        </label>
      </div>

        <div className='submit-container1'>
          <button className="submit1" onClick={handleSignup}>Signup</button>
          <button className="submit1 login-button" onClick={loginHandler}>Login</button>
        </div>
        {error && <span>{error}</span>}
      </div>
    </div>
);

}
