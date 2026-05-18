// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgjU28sOOPK3joKrXgk5cRYz78U-Xeo64",
  authDomain: "chat-sphere-9e62b.firebaseapp.com",
  projectId: "chat-sphere-9e62b",
  storageBucket: "chat-sphere-9e62b.firebasestorage.app",
  messagingSenderId: "18059583226",
  appId: "1:18059583226:web:6616f3af0129fc722f7343",
  measurementId: "G-YWR1S4JJ7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);