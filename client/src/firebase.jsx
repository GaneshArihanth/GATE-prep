// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYJ2PkAZcvzAszxIFkXl_HvJmt0GdbIks",
  authDomain: "gate-analysis.firebaseapp.com",
  projectId: "gate-analysis",
  storageBucket: "gate-analysis.firebasestorage.app",
  messagingSenderId: "63448854301",
  appId: "1:63448854301:web:79ad6223444c0d3ba5bbf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;