import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyAgd7bj6mMVXhoGNF5apVL6aJfno8_xu3s",
  authDomain: "job-portal2-efa9b.firebaseapp.com",
  projectId: "job-portal2-efa9b",
  storageBucket: "job-portal2-efa9b.firebasestorage.app",
  messagingSenderId: "1085534848884",
  appId: "1:1085534848884:web:3956658af9ec53b8408e21",
  measurementId: "G-NEJKL1D82E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export `auth` as default
export default auth;
