import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { c } from "node_modules/framer-motion/dist/types.d-6pKw1mTI";
import { useRouter } from "next/router";

export default function LandingPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="h-[40rem] flex items-center justify-center absolute">
          <TextHoverEffect text="CLEAR" />
        </div>
      </div>
      <Button
        onClick={() => {
          const router = useRouter();
          router.push("/loginPage");
        }}
      >
        {" "}
        Discover clarity{" "}
      </Button>
    </>
  );
}
