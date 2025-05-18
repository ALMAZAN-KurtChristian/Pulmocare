import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Hiw.scss';
import HIWBANNER from './IMAGES/HIW/HIWBANNER.png';
import HIW1 from './IMAGES/HIW/HIW1.png';
import HIW2 from './IMAGES/HIW/HIW2.png';
import HIW3 from './IMAGES/HIW/HIW3.png';
import HIW4 from './IMAGES/HIW/HIW4.png';
import HIW5 from './IMAGES/HIW/HIW5.png';
import FOOTERLOGO from './IMAGES/FOOTER/FOOTERLOGO.png'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from './Footer';



const HIW = () => {
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

  console.log('Hiw - userProfile:', userProfile);


  return (
    <div className='HIW'>
    
      
      <div className="hiw-container">
      <Navbar userProfile={userProfile} />
        <div className="HIWBANNER-image-container">
          <img src={HIWBANNER} alt="Banner2 Image" className="HIWBANNER-image" />
          <div className="text01-overlay">
           <h1> What is PulmoCare? </h1>
            <p>
            PulmoCare is an Al-drivan platform tallared for Our Lady of Fatima University's computer science students. We  provide a convenient and accessible rescurce for a deep understanding of minor pulmonary diseases, early detection, consultations, personalized guidance, and recommendations, empowering students to make informed hecith decisions and ensuring a healthier, brighter future
           </p>
         </div>
        </div>
        <div>
        
          <div className="text-02">
            <h1>How PulmoCare Works</h1>
          </div>
          <ul className="IMG1-list" style={{ display: "flex", flexWrap: "wrap" }}>
            <li>
              <div className="image1-container">
                <img src={HIW1} alt="List1 Image" className="LIST1-image" />
              </div>
            </li>
            <li>
              <div className="image1-container">
                <img src={HIW2} alt="List1 Image" className="LIST1-image" />
              </div>
            </li>
            <li>
              <div className="image1-container">
                <img src={HIW3} alt="List1 Image" className="LIST1-image" />
              </div>
            </li>
          </ul>
          <ul className="IMG1-list" style={{ display: "flex", flexWrap: "wrap" }}>
            <li>
              <div className="image1-container1">
                <img src={HIW4} alt="List1 Image" className="LIST1-image" />
              </div>
            </li>
            <li>
              <div className="image1-container1">
                <img src={HIW5} alt="List1 Image" className="LIST1-image" />
              </div>
            </li>
          </ul>
        </div>
        <Footer />
        </div>
        
      </div>
      
     
  
  );
};

export default HIW;
