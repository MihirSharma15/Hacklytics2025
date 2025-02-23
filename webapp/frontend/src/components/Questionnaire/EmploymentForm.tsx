import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmploymentFormProps {
    onNext: (employment: EmploymentData) => void;
    onBack: () => void;
}

export interface EmploymentData {
    employer?: string;
    jobTitle?: string;
    annualIncome?: string;
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
        <div className="w-full p-6 rounded-2xl max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Employment Information</h2>

            <div className="space-y-5">
                <Input
                    type="text"
                    name="employer"
                    placeholder="Employer Name"
                    value={employment.employer}
                    onChange={handleChange}
                />

                <Input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={employment.jobTitle}
                    onChange={handleChange}
                />

                <Input
                    type="number"
                    name="annualIncome"
                    placeholder="Annual Income ($)"
                    value={employment.annualIncome}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack} className="w-1/3">Back</Button>
                <Button onClick={() => onNext(employment)} className="w-1/3 bg-indigo-900">Next</Button>
            </div>
        </div>
    );
}
