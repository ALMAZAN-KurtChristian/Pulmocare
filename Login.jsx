import React, { useState, useEffect } from 'react';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import p1 from './IMAGES/LOGIN/p1.png';
import p2 from './IMAGES/LOGIN/p2.png';
import p3 from './IMAGES/LOGIN/p3.png';
import l1 from './IMAGES/LOGIN/ldes1.png';
import l2 from './IMAGES/LOGIN/ldes2.png';
import l3 from './IMAGES/LOGIN/ldes3.png';
import l4 from './IMAGES/LOGIN/ldes4.png';

const HorizontalLineWithText = ({ text, loginColor, accountsColor }) => {
  const [firstPart, secondPart] = text.split(' ');

  return (
    <div className="horizontal-line-user">
      <div className="line-user"></div>
      <div className="line-text-user">
        <span style={{ color: loginColor, fontSize: '4vh' }}>{firstPart}</span>
        <span style={{ color: accountsColor, fontSize: '4vh' }}>{secondPart}</span>
      </div>
      <div className="line-user" style={{ color: loginColor }}></div>
    </div>
  );
};

export default function Login() {
  const [error, setError] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (rememberMe) {
      const savedEmail = localStorage.getItem('savedEmail');
      const savedPassword = localStorage.getItem('savedPassword');

      if (savedEmail) {
        setEmail(savedEmail);
      }
      
      if (savedPassword) {
        setPassword(savedPassword);
      }
    } else {
      setEmail('');
      setPassword('');
    }
  }, [rememberMe]);

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

  const signupHandler = () => {
    navigate('/register');
  };

  const handlereset = () => {
    navigate("/reset");
  };

  const mainHandler = () => {
    navigate('/');
  };

  const db = getFirestore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const loginHistoryRef = collection(db, 'Login_History');
        await addDoc(loginHistoryRef, {
          email: user.email,
          timestamp: serverTimestamp(),
          Purpose: selectedPurpose
        });

        const userDocRef = doc(db, 'verified_users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log(`Welcome, ${userData.firstName} ${userData.lastName}`);
          
          if (userData.Super_Admin) {
            navigate('/adminhome');
            return;
          }
        }

        const unverifiedUserDocRef = doc(db, 'unverified_users', user.uid);
        const unverifiedUserDocSnap = await getDoc(unverifiedUserDocRef);

        if (unverifiedUserDocSnap.exists()) {
          const unverifiedUserData = unverifiedUserDocSnap.data();
          const verifiedUsersCollection = collection(db, 'verified_users');
          const verifiedUserDocRef = doc(verifiedUsersCollection, user.uid);

          await setDoc(verifiedUserDocRef, unverifiedUserData);
          await deleteDoc(unverifiedUserDocRef);
        }

        navigate('/Landing');
        
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
          localStorage.setItem('savedPassword', password);
        }
      } else {
        setError('Your email is not verified. Please check your email for a verification link.');
      }
    } catch (error) {
      setError('Invalid username or Password.Also please select Purpose');
    }
  };

  return (
    <div className='log-container'>
      <div className='bg'> 
        <a href="/" onClick={mainHandler}>
          <img src={p1} alt='main' className='bg-login-1' />
        </a>
        <img src={l1} alt='main1'  className='bgdes1' />
        <img src={l2} alt='main2' className='bgdes2' />
        <img src={l3} alt='main3' className='bgdes3' />
        <img src={l4} alt='main4' className='bgdes4' />
        <img src={p2} alt='main5' className='bg-login-2' />

     </div>   
        <form className='container_reg'>
          <div className="header">
            <h2>
              Welcome to <span className="pulmo-care">PulmoCare,</span>
            </h2>
            <h2>Your Virtual Health Companion!</h2>
            <img src={p3} alt="main6" className='bg-login-3' />
          </div>

          <HorizontalLineWithText
            text="Login Account"
            loginColor="#66ABDA"
            accountsColor="#103e7b"
          />

          <div className="user">
            <Person className='icon' style={{
              height: '3vh',
              width: '2vh',
              margin: '0 .7vh',
              marginLeft: '2vh'
            }} />
            <input type='email' placeholder='Email'  style={{
              height: '1vh',
              width: '50%',
              marginLeft: '1.5vh',
              padding: '0.vh',
              fontSize: '2vh',
              color: 'gray'
            }}
            value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="password">
            <Lock className='icon'  style={{
              height: '3vh',
              width: '2vh',
              margin: '0 .7vh',
              marginLeft: '2vh'
            }} />
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
            <IconButton
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              edge="end"
              aria-label="toggle password visibility"
              style={{ marginRight: '1vh'}} >
              {isPasswordVisible ? <VisibilityOff style={{ height: '3vh', width: '2vh'}} /> : <Visibility style={{ height: '3vh', width: '2vh' }} />}
            </IconButton>
          </div>

          <div className="purpose-dropdown">
            <label htmlFor="purpose">Purpose:</label>
            <select id="purpose" value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)} required>
              <option value="Browse for Minor Pulmonary disease">Browse for Minor Pulmonary disease</option>
              <option value="Use Artificial Intelligence">Use Artificial Intelligence</option>
              <option value="Assessment for Minor Pulmonary disease">Assessment for Minor Pulmonary disease</option>
              <option value="All">All</option>
            </select>
          </div>

          <div className="checkbox-and-forgot">
          <div className="check" style={{ fontSize: '2vh', margin: '1vh 0' }}>
  <input 
    type="checkbox" 
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
  <span style={{ color: '#103e7b', marginLeft: '0.5vh' }}>Remember me</span>
</div>
            <div className="forgot-pass" onClick={handlereset} style={{ fontSize: '2vh', margin: '1vh 0' }}>
              Forgot Password?
            </div>
          </div>

          <div className='submit-container'>
            <button className='submit' onClick={handleLogin}>Login</button>
            <button className='submit' onClick={signupHandler}>Create</button>
          </div>

          {error && <span>{error}</span>}
        </form>
      </div>
    
  );
}
