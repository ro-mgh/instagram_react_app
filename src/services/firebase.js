// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import "firebase/database";
// require("dotenv/config");
import dotenv from "dotenv";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

dotenv.config();
// Your app's Firebase configuration
var firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENTID,
  apiKey: "AIzaSyBSM65P5z_9FikGh-QDxQ2ivzU6fiGOkP8",
  authDomain: "fb-instaapp.firebaseapp.com",
  projectId: "fb-instaapp",
  storageBucket: "fb-instaapp.appspot.com",
  messagingSenderId: "623116021000",
  appId: "1:623116021000:web:8cbbaae0d86fdc8f1590bd",
  measurementId: "G-55B76TLNCP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;
