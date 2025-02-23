import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter(); // Correct placement of useRouter

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="h-[40rem] flex items-center justify-center absolute">
          <TextHoverEffect text="CLEAR" />
        </div>
      </div>
      <Button
        onClick={() => {
          router.push("/loginPage");
        }}
      >
        Discover clarity
      </Button>
    </>
  );
}
