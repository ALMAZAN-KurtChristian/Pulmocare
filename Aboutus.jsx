import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Aboutus.scss'; 
import TOP from './IMAGES/ABOUTUS/TOP.png';
import CELL from './IMAGES/ABOUTUS/CELL.png';
import Roger from './IMAGES/ABOUTUS/Roger.png';
import Kurt from './IMAGES/ABOUTUS/Kurt.png';
import Macapogi from './IMAGES/ABOUTUS/Macapogi.png';
import Migz from './IMAGES/ABOUTUS/Migz.png';
import INVITE from './IMAGES/ABOUTUS/INVITE.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from './Footer';

const Aboutus = () => {
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

  console.log('Aboutus - userProfile:', userProfile);


  return (

    <div className="scrollable-container">
      
      
      

      <div className="aboutus-container">
      <Navbar userProfile={userProfile} />
        <div className="TOP-image-container">
          <img src={TOP} alt="Top Image" className="TOP-image" />
          <div className="text-overlay">
            <h1>
              About Bridging Technology and  <br />Healthcare for a Healthier Tomorrow
            </h1>
            <p>
              Welcome to PulmoCare, a pioneering AI-driven platform exclusively designed for the computer science students of Our Lady of Fatima University. At PulmoCare, we are driven by a singular commitment: to empower our students with knowledge and tools that bridge the gap between technology and healthcare, ultimately leading to a healthier and brighter future.
            </p>
          </div>
        </div>
        <div className="CELL-image-container">
          <img src={CELL} alt="Cell Image" className="CELL-image" />
          <div className="text-2nd">
            <h2>ABOUT US</h2>
            <h1>
              Our Mission: Prioritizing Your Wellbeing
            </h1>
            <p>
              Our mission revolves around providing a convenient, accessible, and invaluable resource that equips students with a profound understanding of minor pulmonary diseases. We understand the unique challenges that students face in managing their health while pursuing their educational aspirations. PulmoCare is here to address these challenges and ensure that our students can navigate their academic journey without compromising their well-being.
            </p>
          </div>
        </div>
        <div className="PROFILE-image-container">
          <h2>OUR TEAM</h2>
          <ul className="profile-list">
            <li><img src={Roger} alt="Profile Image" className="PROFILE-image" /><p>Roger Miguel Camba</p></li>
            <li><img src={Kurt} alt="Profile Image" className="PROFILE-image" /><p>Kurt Christian Almazan</p></li>
            <li><img src={Macapogi} alt="Profile Image" className="PROFILE-image" /><p>John Paulo Macapugay</p></li>
            <li><img src={Migz} alt="Profile Image" className="PROFILE-image" /><p>Miguel Justin Pineda</p></li>
          </ul>
        </div>
        <div className="INVITE-image-container">
          <div className="text-3rd">
            <h1>Join Us on the Path to a<br />Brighter, better Future</h1>
            <p>
              We invite you to embark on this journey with us. PulmoCare is more than a platform. It's a community dedicated to your health and success. Together, we'll bridge the realms of technology and healthcare, ensuring that you can breathe easier and live better. Join PulmoCare, and let's pave the way to a healthier and brighter tomorrow.
            </p>
          </div>
          <img src={INVITE} alt="Invite Image" className="INVITE-image" />
        </div>
        
          <Footer />
       
      </div>
    </div>
   
  );
};

export default Aboutus;
