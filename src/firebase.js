import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB25eq1dE9cMabijpGSSQANc-Kvy1qvqRo",
  authDomain: "miniwiki-a56d5.firebaseapp.com",
  projectId: "miniwiki-a56d5",
  storageBucket: "miniwiki-a56d5.appspot.com",
  messagingSenderId: "141877385332",
  appId: "1:141877385332:web:dacb63c90f33e987a89921",
  measurementId: "G-CGK688V2D7",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

