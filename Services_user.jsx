import React, { useEffect, useState } from 'react';
import Navbar_user from './Navbar_user';
import './Services.scss';
import BANNER from './IMAGES/SERVICES/BANNER.png';
import CHATS from './IMAGES/SERVICES/CHATS.png';
import DIAGNOSIS from './IMAGES/SERVICES/DIAGNOSIS.png';
import HEALTHPLAN from './IMAGES/SERVICES/HEALTHPLAN.png';
import Footer from './Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Services_user = () => {
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
  console.log('Services - userProfile:', userProfile);

  return (
    <div className='bg_services'>
      <Navbar_user />
    
    <div className="scrollable1-container">
      {loading && (
        <div className="full-screen-loader">
        </div>
      )}

      
        
      <div className="services-container">
        <div className="BANNER-image-container">
          <img src={BANNER} alt="Banner Image" className="BANNER-image" />
          <div className="text1-overlay">
            <h1> Your Path to <br />Healthier Breathing <br /> Begins Here </h1>
            <p>
              Explore our comprehensive range of services on our path to unlocking pulmonary wellness, where AI guidance meets personalized care.
            </p>
          </div>
        </div>
        <div>
          <div className="Mult-image-container">
            <div className="text-2">
              <h1> Our Features & Services </h1>
              <p> At PulmoCare, we can offer a range of cutting-edge AI-powered services designed to provide you with expert guidance and support for managing pulmonary illnesses </p>
            </div>
            <ul className="IMG-list">
              <li>
                <div className="image-container">
                  <img src={CHATS} alt="List Image" className="LIST-image" />
                  <div className="image-text"><h1>Artificial Intelligence BOT</h1> 
                  <p>Have a informative  information about Pulmonary Diseases
                  <br /> Fact checked by a Health Professional </p></div>
                </div>
              </li>
              <li>
                <div className="image-container">
                  <img src={HEALTHPLAN} alt="List Image" className="LIST-image" />
                  <div className="image-text"><h1>Ways for Healthy life</h1>
                   <p>Received recommendation and tips on 
                   <br /> protecting your pulmonary wellness
                  </p></div>
                </div>
              </li>
              <li>
                <div className="image-container">
                  <img src={DIAGNOSIS} alt="List Image" className="LIST-image" />
                  <div className="image-text"><h1>Preliminary Assessment</h1> 
                  <p>Get valued insights and a better understanding of  
                  <br /> your condition through preliminary diagnostics.</p></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Services_user;
