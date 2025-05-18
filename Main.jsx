import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Home from './Home';
import Splash from './Splash';
import './Main.scss';

const Main = () => {
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

  console.log('Main - userProfile:', userProfile); // Log userProfile in Main component

  return (
    <div>
      {loading && (
        <div className="full-screen-loader">
        </div>
      )}
      {!loading && (
        <>
          {userProfile ? (
            <>
              <Home userProfile={userProfile} />
            </>
          ) : (
            <Splash />
          )}
        </>
      )}
    </div>
  );
};

export default Main;