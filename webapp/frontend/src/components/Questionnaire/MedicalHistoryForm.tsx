import { useState } from "react";

const healthQuestions = [
    "Do you have a history of diabetes?",
    "Do you have a history of heart disease?",
    "Have you ever been diagnosed with high blood pressure?",
    "Do you have high cholesterol?",
    "Have you been diagnosed with asthma or other lung conditions?",
    "Have you had any major surgeries in the past?",
    "Are you currently taking any medications?",
    "Have you ever been diagnosed with cancer?",
    "Do you have any allergies?",
    "Do you smoke or use tobacco products?",
    "Do you consume alcohol?",
    "Do you engage in regular physical activity?",
    "Do you have any diagnosed mental health conditions?",
    "Are you currently pregnant or planning to become pregnant?",
];

interface MedicalHistoryFormProps {
    onNext: (answers: Record<number, string>) => void;
    onBack: () => void;
}

export default function MedicalHistoryForm({ onNext, onBack }: MedicalHistoryFormProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswer = (answer: string) => {
        const updatedAnswers = { ...answers, [currentQuestionIndex]: answer };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < healthQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            onNext(updatedAnswers); // Pass answers to parent on last question
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        } else {
            onBack(); // Call parent onBack if at the first question
        }
    };

    return (
        <div className="p-4 border rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                Medical History ({currentQuestionIndex + 1}/{healthQuestions.length})
            </h2>
            <p className="mb-6 text-lg font-medium">{healthQuestions[currentQuestionIndex]}</p>

            <div className="flex gap-4 mb-8">
                <button onClick={() => handleAnswer("Yes")} className="w-full">Yes</button>
                <button onClick={() => handleAnswer("No")} className="w-full">No</button>
            </div>

            <div className="flex justify-between">
                <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
                    Back
                </button>
                {currentQuestionIndex < healthQuestions.length - 1 && (
                    <button onClick={() => handleAnswer("Skipped")}>Skip</button>
                )}
            </div>
        </div>
    );
}