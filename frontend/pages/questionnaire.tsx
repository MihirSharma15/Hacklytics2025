import React from "react";
import MedicalHistoryForm from "@/components/Questionnaire/MedicalHistoryForm";

export default function Questionnaire() {
    const handleNext = (answers: Record<number, string>) => {
        console.log("Collected Answers:", answers);
        // Navigate to next form step or handle submission
    };

    const handleBack = () => {
        console.log("Navigate to previous step");
    };

    return <MedicalHistoryForm onNext={handleNext} onBack={handleBack} />;
}
