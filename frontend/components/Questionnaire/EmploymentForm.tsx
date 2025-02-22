import { useState } from "react";

interface EmploymentFormProps {
    onNext: (employment: EmploymentData) => void;
    onBack: () => void;
}

export interface EmploymentData {
    employer: string;
    jobTitle: string;
    annualIncome: string;
}

export default function EmploymentForm({ onNext, onBack }: EmploymentFormProps) {
    const [employment, setEmployment] = useState<EmploymentData>({
        employer: "",
        jobTitle: "",
        annualIncome: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployment((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 border rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Employment Information</h2>
            <div className="space-y-4">
                <input type="text" name="employer" placeholder="Employer Name" value={employment.employer} onChange={handleChange} className="w-full p-2 border rounded-xl" />
                <input type="text" name="jobTitle" placeholder="Job Title" value={employment.jobTitle} onChange={handleChange} className="w-full p-2 border rounded-xl" />
                <input type="number" name="annualIncome" placeholder="Annual Income ($)" value={employment.annualIncome} onChange={handleChange} className="w-full p-2 border rounded-xl" />
            </div>
            <div className="flex justify-between mt-6">
                <button onClick={onBack}>Back</button>
                <button onClick={() => onNext(employment)}>Next</button>
            </div>
        </div>
    );
}