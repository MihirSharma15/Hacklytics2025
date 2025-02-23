import { DemographicsData } from "@/components/Questionnaire/DemographicsForm";
import { DependentData } from "@/components/Questionnaire/DependentsForm";
import { EmploymentData } from "@/components/Questionnaire/EmploymentForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    demographics: DemographicsData | null;
    employment: EmploymentData | null;
    medicalHistory: Record<number, string>;
    dependents: DependentData[];
  }>({
    demographics: null,
    employment: null,
    medicalHistory: {},
    dependents: [],
  });

  useEffect(() => {
    const storedData = localStorage.getItem("questionnaireData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Your Dashboard</h1>

      <section className="p-4 border rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Demographics</h2>
        {formData.demographics ? (
          <ul className="space-y-2">
            <li>
              <strong>Name:</strong> {formData.demographics.name}
            </li>
            <li>
              <strong>Date of Birth:</strong>{" "}
              {formData.demographics.dateOfBirth}
            </li>
            <li>
              <strong>Gender:</strong> {formData.demographics.gender}
            </li>
            <li>
              <strong>Race:</strong> {formData.demographics.race}
            </li>
          </ul>
        ) : (
          <p>No demographics information provided.</p>
        )}
      </section>

      <section className="p-4 border rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Employment Information</h2>
        {formData.employment ? (
          <ul className="space-y-2">
            <li>
              <strong>Employer:</strong> {formData.employment.employer}
            </li>
            <li>
              <strong>Job Title:</strong> {formData.employment.jobTitle}
            </li>
            <li>
              <strong>Annual Income:</strong> $
              {formData.employment.annualIncome}
            </li>
          </ul>
        ) : (
          <p>No employment information provided.</p>
        )}
      </section>

      <section className="p-4 border rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
        {Object.keys(formData.medicalHistory).length > 0 ? (
          <ul className="space-y-2">
            {Object.entries(formData.medicalHistory).map(
              ([questionId, answer]) => (
                <li key={questionId}>
                  <strong>Q{questionId}:</strong> {answer}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No medical history information provided.</p>
        )}
      </section>

      <section className="p-4 border rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Dependents</h2>
        {formData.dependents.length > 0 ? (
          <ul className="space-y-2">
            {formData.dependents.map((dep, index) => (
              <li key={index} className="p-2 border rounded-xl">
                <strong>{dep.name}</strong> - {dep.relationship} (DOB:{" "}
                {dep.dateOfBirth})
              </li>
            ))}
          </ul>
        ) : (
          <p>No dependents added.</p>
        )}
      </section>

      <div className="flex justify-center">
        <button onClick={() => router.push("/questionnaire")} className="mt-6">
          Edit Information
        </button>
      </div>
    </div>
  );
}
