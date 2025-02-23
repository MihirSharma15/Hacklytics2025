import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DemographicsForm, {
  DemographicsData,
} from "@/components/Questionnaire/DemographicsForm";
import EmploymentForm, {
  EmploymentData,
} from "@/components/Questionnaire/EmploymentForm";
import MedicalHistoryForm from "@/components/Questionnaire/MedicalHistoryForm";
import Logout from "@/components/logout";

export default function Questionnaire() {
  const [step, setStep] = useState<
    "demographics" | "employment" | "medicalHistory" | "dependents"
  >("demographics");
  const [demographicsData, setDemographicsData] =
    useState<DemographicsData | null>(null);
  const [employmentData, setEmploymentData] = useState<EmploymentData | null>(
    null
  );
  const [medicalHistoryAnswers, setMedicalHistoryAnswers] = useState<
    Record<number, string>
  >({});
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("questionnaireData");
    console.log(storedData);
    if (storedData) {
      const parsedData =
        typeof storedData === "string" ? JSON.parse(storedData) : storedData;
      setDemographicsData(parsedData.demographics || null);
      setEmploymentData(parsedData.employment || null);
      setMedicalHistoryAnswers(parsedData.medicalHistory || {});
    }
  }, []);

  const saveToLocalStorage = (updatedData: {
    demographics?: DemographicsData;
    employment?: EmploymentData;
    medicalHistory?: Record<number, string>;
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

  const handleMedicalHistoryNext = async (answers: Record<number, string>) => {
    setMedicalHistoryAnswers(answers);
    saveToLocalStorage({ medicalHistory: answers });

    const demographics = {
      ...demographicsData,
      ...employmentData,
      medicalHistory: answers,
    };
    const demographicsJSON = JSON.stringify(demographics);

    const storedJwt = localStorage.getItem("jwt");
    console.log("Stored JWT:", storedJwt);
    console.log(demographics);
    console.log(JSON.stringify(demographics));
    console.log("hello");
    // Send to API
    try {
      const response = await fetch(
        "https://scarcely-becoming-griffon.ngrok-free.app/users/create_questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedJwt}`, // Include JWT if needed
          },
          body: JSON.stringify(demographics),
        }
      );
      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Successfully saved:", data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving demographics:", error);
    }

    // router.push("/dashboard");

    router.push("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        {step === "demographics" && (
          <DemographicsForm onNext={handleDemographicsNext} />
        )}
        {step === "employment" && (
          <EmploymentForm
            onNext={handleEmploymentNext}
            onBack={() => setStep("demographics")}
          />
        )}
        {step === "medicalHistory" && (
          <MedicalHistoryForm
            onNext={handleMedicalHistoryNext}
            onBack={() => setStep("employment")}
          />
        )}
      </div>
      <Logout />
    </>
  );
}
