import React from 'react';
import Navbar from './Navbar';
import './Splash.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import Design from './IMAGES/SPLASH/Design.png';
import MASCOT from './IMAGES/SPLASH/MASCOT.png';

const Splash = () => {
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/register');
  };

  return (
    <div className="container-splash">
      <Navbar />
      <div className="splash-container">
        <div className="content-container">
          <h1>
            Breathe Easy, Live Better: <br />Your AI Partner in <br />Pulmonary Wellness!
          </h1>
          <p>
            PulmoCare's AI Provides personalized pulmonary health <br />support and expert guidance.
          </p>
          <button className="create-account" onClick={signupHandler}>
            <a>Create an Account</a>
          </button>
        </div>
        <img src={Design} alt="Design Image" className="design-image" />
        <img src={MASCOT} alt="Mascot Image" className="mascot-image" />
      </div>
    </div>
  );
};

export default Splash;
