import React, { useState, useEffect } from 'react';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PulmoCareLogo from './IMAGES/NAVBAR/PulmoCare.png';
import ProfileImage from './IMAGES/NAVBAR/PROFILE.png';
import './Navbar_user.scss';

const Navbar_user = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'verified_users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile(userData);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
      console.log('Redirecting to /');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  
  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const servicesHandler = () => {
    navigate('/services_users');
  };

  const hiwHandler = () => {
    navigate('/how-it-works_users');
  };

  const docHandler = () => {
    navigate('/Doctor_details');
  };
  
  const HandleSettings = () => {
    navigate('/Account');
  };

  const Handleticket = () => {
    navigate('/ticket');
  };

  const HandleAI = () => {
    navigate('/main');
  };

  const HandleAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="navbar-content">
      <div className="navbar-left">
        <a href={'/Landing'}>
          <img src={PulmoCareLogo} alt="PulmoCare Logo" className="navbar-logo" />
        </a>
      </div>
      <ul className="navbar-list">
        {userProfile && (
          <>
            <li><a href="/services_users" onClick={servicesHandler}>Services</a></li>
            <li><a href="/how-it-works_users" onClick={hiwHandler}>How it Works</a></li>
            <li><a href="/assessment" onClick={HandleAssessment}>Assessment</a></li>
            <li><a href="/main" onClick={HandleAI}>Chatbot</a></li>
            <li><a href="/Doctor_details" onClick={docHandler}>Doctor Details</a></li>
          </>
        )}
      </ul>
      <div className="navbar-right">
        {userProfile && (
          <div className="user-welcome">
            <div className="user-welcome-image" onClick={toggleAdditionalContent}>
              <img src={userProfile.photoURL || ProfileImage} alt="Profile Image" className="PROF-image" />
            </div>
            <div className="user-welcome-text">
              <span>{userProfile.firstName} {userProfile.lastName}</span>
            </div>
            <div className="user-welcome-icon" onClick={toggleAdditionalContent}>
              <span>...</span>
            </div>
            {showAdditionalContent && (
              <div className="additional-content">
                {/* Handle account settings */}
                <div className="settings" onClick={HandleSettings}>
                  <AccountCircleIcon style={{ height: '5vh', width: '4vh', margin: '0 .4vh' }} />
                  Settings
                </div>

                {/* Handle ticketing functionality */}
                <div className="settings" onClick={Handleticket}>
                  <LocalActivityIcon style={{ height: '5vh', width: '4vh', margin: '0 .4vh' }} />
                  Ticket
                </div>

                {/* Handle logout */}
                <div className="button-logout" onClick={handleLogout}>
                  <ExitToAppIcon style={{ transform: 'rotate(180deg)', height: '5vh', width: '4vh', margin: '0 .4 vh' }} color="inherit" />
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar_user;
