// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtPxS63rW3JIHMjAiD6JatGL8Od03S4dU",
  authDomain: "ecom-47894.firebaseapp.com",
  projectId: "ecom-47894",
  storageBucket: "ecom-47894.appspot.com",
  messagingSenderId: "767947451454",
  appId: "1:767947451454:web:cf5769284eb9560820756f",
  measurementId: "G-SW8W89Z3V0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);