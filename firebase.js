import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD02iHnK7YpA6XgE-ces71rgWoxmHEw6-s",
  authDomain: "myproj-2074d.firebaseapp.com",
  projectId: "myproj-2074d",
  storageBucket: "myproj-2074d.appspot.com",
  messagingSenderId: "711037439551",
  appId: "1:711037439551:web:0761da4d63ca5804f0b28a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth() 
export const storage = getStorage(app);
