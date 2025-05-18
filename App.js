import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { userInputs } from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeContext';
import AdminHome from './admin pages/adminhome/Adminhome';
import List from './admin pages/list/List';
import Single from './admin pages/single/Single';
import New from './admin pages/new/New';
import HistoryList from './admin pages/historylist/HistoryList';
import TicketList from './admin pages/ticketlist/TicketList';
import ReportList from './admin pages/reportlist/ReportList';
import SubmissionList from './admin pages/submissionlist/SubmissionList';
import Adminprofile from './admin pages/adminprofile/Adminprofile';
import Stats from './admin pages/stats/Stats';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Aboutus from './pages/Aboutus';
import Services from './pages/Services';
import Hiw from './pages/Hiw';
import TermsAndCondition from './pages/TermsAndCondition';
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLog';
import Hiw_users from './pages/Hiw_user';
import Services_user from './pages/Services_user';
import Doctor_details from './pages/Doctor_details';
import Account from './pages/Account_Details';
import Main from './components/main/Main';
import Ticket from './pages/Ticket';
import UserAssessmentForm from './pages/AssessmentForm';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD02iHnK7YpA6XgE-ces71rgWoxmHEw6-s",
  authDomain: "myproj-2074d.firebaseapp.com",
  projectId: "myproj-2074d",
  storageBucket: "myproj-2074d.appspot.com",
  messagingSenderId: "711037439551",
  appId: "1:711037439551:web:0761da4d63ca5804f0b28a"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("users").get();
        console.log(data.docs.map(doc => doc.data()));
    }
    fetchData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/AdminLogin" />;
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Router>
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/how-it-works" element={<Hiw />} />
          <Route path="/how-it-works_users" element={<Hiw_users />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services_users" element={<Services_user/>} />
          <Route path="/Terms-And-Condition" element={<TermsAndCondition />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/assessment" element={<UserAssessmentForm />} />
          <Route path="/Doctor_details" element={<Doctor_details />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/ticket" element={<Ticket />} />   
          <Route path="/Main" element={<Main />} />
          <Route
            path="/dashboard"
            element={<RequireAuth><AdminHome /></RequireAuth>} />
          <Route
            path="/users"
            element={<RequireAuth><List /></RequireAuth>} />
          <Route
            path="/history"
            element={<RequireAuth><HistoryList /></RequireAuth>} />
          <Route
            path="/submissions"
            element={<RequireAuth><SubmissionList /></RequireAuth>} />
          <Route
            path="/tickets"
            element={<RequireAuth><TicketList /></RequireAuth>} />
            <Route
            path="/reports"
            element={<RequireAuth><ReportList /></RequireAuth>} />
          <Route
            path="/stats"
            element={<RequireAuth><Stats /></RequireAuth>} />
          <Route
            path="/adminprofile"
            element={<RequireAuth><Adminprofile /></RequireAuth>} />
          <Route
            path="/users/:userId"
            element={<RequireAuth><Single /></RequireAuth>} />
          <Route
            path="/users/new"
            element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>} />    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
