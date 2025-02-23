import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase-safe"; // Ensure this is properly configured
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading when login is attempted
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // After login completes, push to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid); // Reference to the user's Firestore document
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Check if the specific field exists
          const fieldExists = userDoc.data().demographicQuestions; // Replace 'yourFieldName' with the field you're checking

          if (fieldExists) {
            router.push("/dashboard"); // Redirect to dashboard if field exists
          } else {
            router.push("/questionnaire"); // Redirect to questionnaire if field doesn't exist
          }
        } else {
          console.error("User document does not exist");

          // Add a new document with default values
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date(), // Optionally, add a timestamp
          });

          // Redirect the user to the questionnaire page after creating the document
          router.push("/questionnaire");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back!</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login with Google"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
