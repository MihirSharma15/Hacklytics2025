import { auth } from "../firebase-safe";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default Login;
