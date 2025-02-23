import { GalleryVerticalEnd } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-safe";

import LoginForm from "@/components/loginForm";

export default function LoginPage() {
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
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ClearCare
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
