import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import LandingPage from "./landingpage";
import { auth } from "../../firebase-safe";

export default function Home() {
  return <LandingPage />;
}
