import { useState } from "react";
import { Input } from "@/components/ui/input"; // Shad's Input component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Shad's RadioGroup component
import { Button } from "@/components/ui/button"; // Shad's Button component
import { Label } from "@/components/ui/label"; // Shad's Label component

interface MedicalHistoryFormProps {
    onNext: (answers: Record<number, string>) => void;
    onBack: () => void;
}

export default function MedicalHistoryForm({ onNext, onBack }: MedicalHistoryFormProps) {
    const questions = [
        { label: "Chronic conditions", type: "text" },
        { label: "ER trips in last 3 months?", type: "number" },
        { label: "Do you have diabetes?", type: "radio", options: ["Yes", "No"] },
        { label: "Do you smoke?", type: "radio", options: ["Yes", "No"] },
        { label: "Do you do any hard drugs?", type: "text" },
        { label: "BMI", type: "number" },
        { label: "Are you Medicare eligible?", type: "radio", options: ["Yes", "No"] },
        { label: "Are you Medicaid eligible?", type: "radio", options: ["Yes", "No"] },
        { label: "Any prescription medications?", type: "text" },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleAnswerChange = (answer: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            onNext(answers);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        } else {
            onBack();
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full p-6 rounded-2xl max-w-md mx-auto">
            <div className="space-y-8">

                <h2 className="text-2xl font-semibold mb-6">
                    Medical History ({currentQuestionIndex + 1}/{questions.length})
                </h2>

                <div className="space-y-4 text-left max-w-full">
                    <Label className="text-lg font-medium block">{currentQuestion.label}</Label>

                    {currentQuestion.type === "text" && (
                        <Input
                            type="text"
                            value={answers[currentQuestionIndex] || ""}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="w-full"
                        />
                    )}

                    {currentQuestion.type === "number" && (
                        <Input
                            type="number"
                            value={answers[currentQuestionIndex] || ""}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="w-full"
                        />
                    )}

                    {currentQuestion.type === "radio" && (
                        <RadioGroup
                            value={answers[currentQuestionIndex] || ""}
                            onValueChange={handleAnswerChange}
                            className="space-y-3"
                        >
                            {currentQuestion.options?.map((option) => (
                                <div key={option} className="flex items-center space-x-3">
                                    <RadioGroupItem value={option} id={`${currentQuestionIndex}-${option}`} />
                                    <Label htmlFor={`${currentQuestionIndex}-${option}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>
            </div>

            <div className="flex justify-between mt-10 gap-4 w-full">
                <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0} className="w-32">
                    Back
                </Button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={handleNext} className="w-32 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                        Next
                    </Button>
                ) : (
                    <Button onClick={handleNext} className="w-32 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
}