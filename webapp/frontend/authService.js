// AuthService.js - Handle Firebase Auth actions
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config"; // import Firebase auth object

// Sign Up function
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // returns the user object
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

// Sign In function
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // returns the user object
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

export { signUp, signIn };