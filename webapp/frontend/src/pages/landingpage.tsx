import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function LandingPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="h-[40rem] flex items-center justify-center absolute">
                <TextHoverEffect text="CLEAR" />
            </div>
        </div >
    );
}   