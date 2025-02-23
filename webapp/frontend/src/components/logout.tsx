import React from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-safe"; // Adjust path if needed

const logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/loginPage"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      className="p-3 bg-red-500 text-white rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default logout;
