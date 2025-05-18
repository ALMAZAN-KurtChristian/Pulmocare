import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Email from "@mui/icons-material/Email";
import ArrowBack from "@mui/icons-material/ArrowBack";
import './ForgotPassword.scss'; 
import Swal from 'sweetalert2';
import R2 from './IMAGES/REGISTER/R1.png';
import KEY from './IMAGES/FORGOT/KEY.png';
import Footer from './Footer';



function ForgotPassword() {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    
    const auth = getAuth();

    if (!emailVal.endsWith('@student.fatima.edu.ph')) {
      Swal.fire({
        title: 'Error',
        text: 'Only student Gmail addresses are allowed.',
        icon: 'error',
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailVal);

      Swal.fire({
        title: 'Password Reset Email Sent',
        text: 'Please check your email to reset your password.',
        icon: 'success',
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Swal.fire({
          title: 'Error',
          text: 'Email not found in the database.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }
    }
  };

  const handleReturn = () => {
    navigate("/login");
  };

  return (
   <>
    <div className="bg_forgot">
    <a href="/">
  <img src={R2} alt='main' className='bg-for-1' />
</a>
      <div className="contain">
        <img src={KEY} alt='top' className='keyimg' />
        <h1 id="h1-f">Forgot Password? No Worries!<br /><span id="text">Enter your email and we will send you a reset</span></h1>
        <form onSubmit={(e) => handleSubmit(e)} id="form-f">
          <div className="mail">
            <Email className='icon'  style={{
    height: '2vh', // Adjust the height as needed
    width: '2vh', // Adjust the width to maintain aspect ratio
    margin: '0 .7vh', // Adjust the margin as needed
    marginLeft: '1.5vh' // Adjust the left margin as needed
  }} />
       <input
  type='email'
  placeholder='Email'
  name="email"
  id='input-f'
  style={{
    height: '1vh', // Adjust the height as needed
    width: '8vh', // Adjust the width as needed
    marginLeft: '1.5vh', // Adjust the left margin as needed
    padding: '0.5vh', // Adjust the padding as needed
    fontSize: '2vh', // Adjust the font size of the placeholder text
    color: 'gray' // Adjust the color of the placeholder text
  }}
/>

          </div>
          <div className="button-container">
            <button className="button_submit">Submit</button>
          </div>
        </form>
      <div> 
        <div className="back-button-container">
          <ArrowBack className='icon2' style={{
    height: '3vh', // Adjust the height as needed
    width: '3vh', // Adjust the width to maintain aspect ratio
    margin: '0 .7vh', // Adjust the margin as needed
    marginLeft: '-1vh' // Adjust the left margin as needed
  }}/>
          <span className="button_back" onClick={handleReturn}>Back To Login</span>
        </div>
      </div>
      
      </div>
      
    </div>
    <Footer />
    </>
   
  );
}

export default ForgotPassword;
