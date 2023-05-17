// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIoomfvPM8SRwqAOqYG4sgIyTy_tuWnOQ",
  authDomain: "courier-application-a7d23.firebaseapp.com",
  projectId: "courier-application-a7d23",
  storageBucket: "courier-application-a7d23.appspot.com",
  messagingSenderId: "357303065126",
  appId: "1:357303065126:web:d90fb7c0da1dce41c0e4e7",
  measurementId: "G-RH4VNVLJ45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

