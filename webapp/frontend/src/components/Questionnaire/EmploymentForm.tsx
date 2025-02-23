import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"; // ensure RadioGroupItem is imported
import { Label } from "../ui/label"; // import Label if not already imported

interface EmploymentFormProps {
  onNext: (employment: EmploymentData) => void;
  onBack: () => void;
}

export interface EmploymentData {
  employer?: string;
  jobTitle?: string;
  annualIncome?: string;
  offersInsurance?: boolean; // Add field for insurance offering
}

export default function EmploymentForm({
  onNext,
  onBack,
}: EmploymentFormProps) {
  const [employment, setEmployment] = useState<EmploymentData>({
    employer: "",
    jobTitle: "",
    annualIncome: "",
    offersInsurance: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployment((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsuranceChange = (value: string) => {
    // Convert "yes" to true, "no" to false
    setEmployment((prev) => ({
      ...prev,
      offersInsurance: value === "yes",
    }));
  };

  return (
    <div className="w-full p-6 rounded-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Employment Information</h2>

      <div className="space-y-2">
        <div>
          <Label htmlFor="employer">Employer</Label>
          <Input
            type="text"
            name="employer"
            placeholder="Employer Name"
            value={employment.employer}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={employment.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="annualIncome">Annual Income</Label>
          <Input
            type="number"
            name="annualIncome"
            placeholder="Annual Income ($)"
            value={employment.annualIncome}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="annualIncome">
            Does your employer offer insurance?
          </Label>

          <RadioGroup
            value={employment.offersInsurance ? "yes" : "no"}
            onValueChange={handleInsuranceChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="offersInsurance-yes" />
              <Label htmlFor="offersInsurance-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="offersInsurance-no" />
              <Label htmlFor="offersInsurance-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          Back
        </Button>
        <Button
          onClick={() => onNext(employment)}
          className="w-1/3 bg-indigo-900"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
