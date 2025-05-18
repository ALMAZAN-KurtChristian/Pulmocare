import React from 'react';
import './Landing.scss';
import TOP from './IMAGES/LANDING/TOP.png';
import CELL from './IMAGES/LANDING/CELL.png';
import Disease1 from './IMAGES/LANDING/Disease1.png';
import Disease2 from './IMAGES/LANDING/Disease2.png';
import Disease3 from './IMAGES/LANDING/Disease3.png';
import Disease4 from './IMAGES/LANDING/Disease4.png';
import Disease5 from './IMAGES/LANDING/Disease5.png';
import PRV1 from './IMAGES/LANDING/PRV1.png';
import PRV2 from './IMAGES/LANDING/PRV2.png';
import PRV3 from './IMAGES/LANDING/PRV3.png';
import PRV4 from './IMAGES/LANDING/PRV4.png';
import BOT from './IMAGES/LANDING/BOT.png';
import Navbar_user from './Navbar_user';
import Footer from './Footer';


const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar_user />
{/* Image container */}
      <div className="TOP-image-container">
          <img src={TOP} alt="Top Image" className="Landing-TOP-image" />
          <div className="Landing-text-overlay">
            <h1>
              Breathe Better.<br />
              Feel Better.
            </h1>
            <p>
             Your trusted companion for respiratory health assessment and management.
             Our website is dedicated to empowering individuals to take control of their
             respiratory well-being through innovative tools and resources.
                 Welcome to Pulmocare
            </p>
          </div>
        </div>
{/* System Checker */}
        <div className="Landing-CELL-image-container">
          <img src={CELL} alt="Cell Image" className="Landing-CELL-image" />
          <div className="Landing-text">
            
            <h2>System Checker Tool</h2>
            <p>
              Begin your Journey to better respiratory health with our interactive symptom
              assessment tool. Whether you're experiencing coughing, shortness of breath, or
              other respiratory symptoms, our assessment tool is your first step
              towards proactive health management. Start your assessment now and take control
              of your respiratory well-being.
            </p>
          </div>
{/* Diseases */}
        </div>
        <div className="Disease-container">
          <h2>What are the common symptom</h2>
          <ul className="Landing-Disease-Container">
            <li><img src={Disease1} alt="Profile Image" className="Disease-image" /></li>
            <li><img src={Disease2} alt="Profile Image" className="Disease-image" /></li>
            <li><img src={Disease3} alt="Profile Image" className="Disease-image"/></li>
            <li><img src={Disease4} alt="Profile Image" className="Disease-image" /></li>
            <li><img src={Disease5} alt="Profile Image" className="Disease-image" /></li>
          </ul>
        </div>
{/* PRV */}
        <div className="PRV-container">
          <h2>Prevention Tips</h2>
          <ul className="Landing-PRV-Container">
            <li><img src={PRV1} alt="Profile Image" className="PRV-image" /></li>
            <li><img src={PRV2} alt="Profile Image" className="PRV-image" /></li>
            <li><img src={PRV3} alt="Profile Image" className="PRV-image"/></li>
            <li><img src={PRV4} alt="Profile Image" className="PRV-image" /></li>
          </ul>
          </div>
{/* Early Detection system */}
          <div className="Landing-Early-image-container">
          <img src={BOT} alt="Cell Image" className="Landing-Early-image" />
          <div className="Landing-Early-text">
            <h2>Why is Early Detection Important?</h2>
            <p>
              Early detection plays a crucial role in maintaning optimal respiratory health and well-
              being . By identifying respiratory conditions in their early stages, individuals can benefit
              from timely intervention and treantment, which can significantly impact disease
              progression and outcomes. Early Detection allows for the implementation of preventative
              measures and lifestyle modifications to minimize the impact of respiratory illnessess,
              reducing the risk of complications and improving overall quality of life.
            </p>
          </div>
         
          
        </div>
   <Footer />
    </div>
   
   
  );
};

export default Landing;
