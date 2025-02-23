// FirestoreService.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-safe"; // import firestore db object

const createUserDocument = async (user) => {
  try {
    // Create a new document for the user in the 'users' collection
    const userRef = doc(db, "users", user.uid); 
    await setDoc(userRef, {
      email: user.email,
      isFirstTime: true, // you can customize this with your own data
    });
    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export { createUserDocument };