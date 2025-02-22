// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQa5zQnhOv0rGfQxxASXXs1FpTfSQY_kQ",
  authDomain: "hacklytics2025-2992e.firebaseapp.com",
  projectId: "hacklytics2025-2992e",
  storageBucket: "hacklytics2025-2992e.firebasestorage.app",
  messagingSenderId: "940515104682",
  appId: "1:940515104682:web:0f9deaba161c9138863dd3",
  measurementId: "G-1BJ0TS8391"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };