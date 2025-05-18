import React, { useState, useEffect } from 'react';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore'; // Updated imports
import { useNavigate } from 'react-router-dom';
import p1 from './IMAGES/LOGIN/p1.png';
import p3 from './IMAGES/LOGIN/p3.png';
import './AdminLog.scss';

const HorizontalLineWithText = ({ text, loginColor, accountsColor }) => {
  const [firstPart, secondPart] = text.split(' ');

  return (
    <div className="horizontal-line">
      <div className="line"></div>
      <div className="line-text">
        <span style={{ color: loginColor }}>{firstPart}</span>
        <span style={{ color: accountsColor }}>{secondPart}</span>
      </div>
      <div className="line"></div>
    </div>
  );
};

export default function AdminLogin() {
  const [error, setError] = useState(false); // Changed initial state to false
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(); // Firestore instance

  useEffect(() => {
    if (rememberMe) {
      const savedEmail = localStorage.getItem('savedEmail');
      const savedPassword = localStorage.getItem('savedPassword');

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    }
  }, [rememberMe]);

  const Admin_handlereset = () => {
    navigate("/reset");
  };

  const Admin_mainHandler = () => {
    navigate('/');
  };

  const Services = () => {
    navigate("/Services");
  };
  
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
  const Admin_handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const adminQuery = query(collection(db, 'verified_users'), where('email', '==', email));
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.size > 0) {
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError(true);
    }
  };

  return (
    <div className='admin-log-container'>
      <form className='admin-container_reg'>
        <div className="admin-header">
          <a href="/" onClick={Admin_mainHandler}>
            <img src={p1} alt='main' className='admin-Pulmocare-icon' />
          </a>
          <h2>
            Welcome to <span className="admin-pulmo-care">PulmoCare,</span>
          </h2>
          <h2>Your Virtual Health Companion!</h2>
          <img src={p3} alt="main6" className='admin-user-icon ' />
        </div>

        <HorizontalLineWithText text="Admin Account" loginColor="#66ABDA" accountsColor="#103e7b" />

        <div className="admin">
          <Person className='admin-icon' style={{
              height: '3vh',
              width: '2vh',
              margin: '0 .7vh',
              marginLeft: '2vh'
            }}/>
          <input type='email' placeholder='Email' style={{
              height: '1vh',
              width: '50%',
              marginLeft: '1.5vh',
              padding: '0.vh',
              fontSize: '2vh',
              color: 'gray'
            }}
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="admin-password">
          <Lock className='admin-icon' style={{
              height: '3vh',
              width: '2vh',
              margin: '0 .7vh',
              marginLeft: '2vh'}} />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder='Password'
            style={{
              height: '1vh',
              width: '100%',
              marginLeft: '1.5vh',
              padding: '0.5vh',
              fontSize: '2vh',
              color: 'gray'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton onClick={() => setIsPasswordVisible((prev) => !prev)}
           edge="end" aria-label="toggle password visibility" 
           
           style={{ marginRight: '1vh'}} >  {isPasswordVisible ? <VisibilityOff style={{ height: '3vh', width: '2vh'}} /> : <Visibility style={{ height: '3vh', width: '2vh' }} />}
           </IconButton>
        </div>

        <div className="admin-checkbox-and-forgot">
          <div className="admin-check">
            <input type="checkbox"
             checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)} 
            style={{ 
              appearance: 'none', // Remove default checkbox appearance
              marginRight: '1vh', 
              height: '2vh', 
              width: '2vh', 
              borderRadius: '0.5vh', // Adjust the border radius for the box-like appearance
              border: '.1vh solid #103e7b', // Add border for the box-like appearance
              backgroundColor: rememberMe ? '#103e7b' : 'transparent', // Change background color when checked
            }} 
            /> 
            <span style={{ color: '#103e7b', marginLeft: '0.5vw' ,fontSize: '2vh' }}>Remember me!</span>

          </div>
          <div className="forgot-pass" onClick={Admin_handlereset} style={{ fontSize: '2vh', margin: '1vh 0' }}>
            Forgot Password?
          </div>
        </div>
        {error && <span className="error-message">Invalid email or password. Please try again.</span>}
        <div className='admin-submit-container'>
        <button className='admin-submit' onClick={Admin_handleLogin}>Login</button>
        <button className='admin-submit' onClick={Services}>Back</button>
         
        </div>

     

      </form>

    </div>
  );
}
