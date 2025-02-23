import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { motion } from "motion/react";

export default function LandingPage() {

    const data = [
        {
            title: "Sign Up",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Fill out a questionnaire about your demographics, employment, and medical history
                    </p>
                    <div className="grid">
                        <Image
                            src="/questionnaire.png"
                            alt="startup template"
                            width={500}
                            height={500}
                            className="rounded-lg object-contain h-[400px] md:h-[500px] lg:h-[600px] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Get Plans",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Get suggested healthcare insurance plans that best fit your financial needs.
                    </p>
                    <div className="grid">
                        <Image
                            src="/plans.png"
                            alt="startup template"
                            width={500}
                            height={800}
                            className="rounded-lg object-contain h-[400px] md:h-[500px] lg:h-[600px] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "File Claims",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Compare and contrast plans and file your claims
                    </p>
                    <div className="grid">
                        <Image
                            src="/dashboard.png"
                            alt="startup template"
                            width={500}
                            height={800}
                            className="rounded-lg object-contain h-[400px] md:h-[500px] lg:h-[600px] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
    ];
    const router = useRouter();

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center relative">
                <div className="flex flex-col items-center">
                    <div className="h-[20rem] flex-col flex items-center justify-center mb-8">
                        <TextHoverEffect text="CLEAR" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 2 }}
                        >
                            <p className="text-[3.5rem] font-semibold">
                                Get the <span className="text-[#5046e6]">care</span> you deserve.
                            </p>
                        </motion.div>
                    </div>
                </div>
                <motion.div>
                    <Button className="w-40 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold h-12 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300" onClick={() => {
                        router.push("/loginPage");
                    }}>Get started</Button>
                </motion.div>

            </div>
            <div className="w-full">
                <Timeline data={data} />
            </div>
        </>
    );
}
