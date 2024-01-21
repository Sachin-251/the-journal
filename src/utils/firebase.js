// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "journal-1a908.firebaseapp.com",
  projectId: "journal-1a908",
  storageBucket: "journal-1a908.appspot.com",
  messagingSenderId: "396603081330",
  appId: "1:396603081330:web:6862365d23b56e12de38eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);