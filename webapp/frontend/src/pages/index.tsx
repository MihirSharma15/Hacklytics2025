import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-safe";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to dashboard if user is logged in
        router.push("/dashboard");
      } else {
        // Redirect to login page if no user is logged in
        router.push("/loginPage");
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return <div>Loading...</div>;
}
