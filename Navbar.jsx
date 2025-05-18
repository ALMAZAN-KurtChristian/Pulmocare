import React from 'react';
import { useNavigate } from 'react-router-dom';
import PulmoCare from './IMAGES/NAVBAR/PulmoCare.png';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const mainHandler = () => {
    navigate('/');
  };

  const servicesHandler = () => {
    navigate('/services');
  };

  const hiwHandler = () => {
    navigate('/how-it-works');
  };

  const aboutusHandler = () => {
    navigate('/aboutus');
  };

 

  return (
    <nav className="navbar-page">
      <div className="navbar-content-page">
        <div className="navbar-left-page">
          <a href={'/'} onClick={mainHandler}>
            <img src={PulmoCare} alt="PulmoCare Logo" className="navbar-logo-page" />
          </a>
        </div>
      
        <ul className="navbar-list-page">
          <li><a href="/services" onClick={servicesHandler}>Services</a></li>
          <li><a href="/how-it-works" onClick={hiwHandler}>How it Works</a></li>
          <li><a href="/aboutus" onClick={aboutusHandler}>About us</a></li>
        </ul>
      
      </div>
     
      <div className="navbar-button-page">
        <button className="navbar-button-admin-page" onClick={() => navigate('/AdminLogin')}>Admin</button>
        <button className="navbar-button-login-page" onClick={() => navigate('/login')}>Login</button>
        <button className="navbar-button-signup-page" onClick={() => navigate('/register')}>Signup for free</button>
      
      </div>
    </nav>
  );
};

export default Navbar;


