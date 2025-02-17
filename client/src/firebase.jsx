// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcagKosfOY21oMP3T-sKe6Npp1JcjSkeo",
  authDomain: "fir-b52e7.firebaseapp.com",
  projectId: "fir-b52e7",
  storageBucket: "fir-b52e7.firebasestorage.app",
  messagingSenderId: "726454873438",
  appId: "1:726454873438:web:9dbc355ad232c5deccf3cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;