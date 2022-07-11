// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI8RSCscuLKRqO0J624xDBBFDVqaCjBb0",
  authDomain: "cars-project-6cf91.firebaseapp.com",
  projectId: "cars-project-6cf91",
  storageBucket: "cars-project-6cf91.appspot.com",
  messagingSenderId: "139507892748",
  appId: "1:139507892748:web:f163c6ecc29efa1c61e429",
  measurementId: "G-HF59JYNXXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)