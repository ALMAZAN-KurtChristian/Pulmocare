import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Account_Details.scss';
import Navbar_user from './Navbar_user';
import Footer from './Footer';
;
const AccountDetails = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'verified_users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile(userData);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
  <div className='bg_settings'>
  <Navbar_user />
  <div className='Account_Container'>
  
    <div className='Account_Settings'>

      <h2>Account Details</h2>
      <div className='line-divider'></div>
      <div className='Account_columns'>
      {userProfile ? (
        <>
          <p className='profile-detail'>First Name: <span className='profile-detail-value'>{userProfile.firstName}</span></p>
          <p className='profile-detail'>Last Name: <span className='profile-detail-value'>{userProfile.lastName}</span></p>
          <p className='profile-detail'>Email: <span className='profile-detail-value'>{userProfile.email}</span></p>
          <p className='profile-detail'>Course: <span className='profile-detail-value'>{userProfile.course}</span></p>
          <p className='profile-detail'>Contact: <span className='profile-detail-value'>{userProfile.contact}</span></p>
          <p className='profile-detail'>Age: <span className='profile-detail-value'>{userProfile.age}</span></p>
          <p className='profile-detail'>Student ID: <span className='profile-detail-value'>{userProfile.studentId}</span></p>
          <p className='profile-detail'>Year Level: <span className='profile-detail-value'>{userProfile.yearLevel}</span></p>
          {/* Add additional fields as needed */}
        </>
      ) : (
        <p>No user profile found.</p>
      )}
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AccountDetails;
