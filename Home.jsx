import React from 'react';
import Navbar from './Navbar';
import ChatBot from './ChatBot';
import './Home.scss';
import Footer from './Footer';

const Home = ({ userProfile }) => {
  return (
    <div className="home-container">
      <Navbar userProfile={userProfile} />
      <ChatBot />
      <div className="under-text">PulmoCare may produce inaccurate information about certain health issues. <a href="">PulmoCare Version October 27, 2023</a></div>
      <Footer />
    </div>
  );
};

export default Home;