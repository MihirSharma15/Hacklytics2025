import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DemographicsForm, { DemographicsData } from "@/components/Questionnaire/DemographicsForm";
import EmploymentForm, { EmploymentData } from "@/components/Questionnaire/EmploymentForm";
import MedicalHistoryForm from "@/components/Questionnaire/MedicalHistoryForm";
import DependentsForm, { DependentData } from "@/components/Questionnaire/DependentsForm";

export default function Questionnaire() {
    const [step, setStep] = useState<"demographics" | "employment" | "medicalHistory" | "dependents">("demographics");
    const [demographicsData, setDemographicsData] = useState<DemographicsData | null>(null);
    const [employmentData, setEmploymentData] = useState<EmploymentData | null>(null);
    const [medicalHistoryAnswers, setMedicalHistoryAnswers] = useState<Record<number, string>>({});
    const [dependents, setDependents] = useState<DependentData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem("questionnaireData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setDemographicsData(parsedData.demographics || null);
            setEmploymentData(parsedData.employment || null);
            setMedicalHistoryAnswers(parsedData.medicalHistory || {});
            setDependents(parsedData.dependents || []);
        }
    }, []);

    const saveToLocalStorage = (updatedData: {
        demographics?: DemographicsData;
        employment?: EmploymentData;
        medicalHistory?: Record<number, string>;
        dependents?: DependentData[];
    }) => {
        const existingData = localStorage.getItem("questionnaireData");
        const parsedData = existingData ? JSON.parse(existingData) : {};

        const mergedData = { ...parsedData, ...updatedData };
        localStorage.setItem("questionnaireData", JSON.stringify(mergedData));
    };

    const handleDemographicsNext = (data: DemographicsData) => {
        setDemographicsData(data);
        saveToLocalStorage({ demographics: data });
        setStep("employment");
    };

    const handleEmploymentNext = (data: EmploymentData) => {
        setEmploymentData(data);
        saveToLocalStorage({ employment: data });
        setStep("medicalHistory");
    };

    const handleMedicalHistoryNext = (answers: Record<number, string>) => {
        setMedicalHistoryAnswers(answers);
        saveToLocalStorage({ medicalHistory: answers });
        setStep("dependents");
    };

    const handleDependentsNext = (dependentsData: DependentData[]) => {
        setDependents(dependentsData);
        saveToLocalStorage({ dependents: dependentsData });
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            {step === "demographics" && <DemographicsForm onNext={handleDemographicsNext} />}
            {step === "employment" && (
                <EmploymentForm onNext={handleEmploymentNext} onBack={() => setStep("demographics")} />
            )}
            {step === "medicalHistory" && (
                <MedicalHistoryForm onNext={handleMedicalHistoryNext} onBack={() => setStep("employment")} />
            )}
            {step === "dependents" && (
                <DependentsForm onNext={handleDependentsNext} onBack={() => setStep("medicalHistory")} />
            )}
        </div>
    );
}