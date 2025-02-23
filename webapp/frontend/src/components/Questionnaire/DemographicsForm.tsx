import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

interface DemographicsFormProps {
  onNext: (demographics: DemographicsData) => void;
}

export interface DemographicsData {
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  state?: string;
  familySize?: number;
}

export default function DemographicsForm({ onNext }: DemographicsFormProps) {
  const [demographics, setDemographics] = useState<DemographicsData>({
    name: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    familySize: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDemographics((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onNext(demographics);
  };

  return (
    <div className="w-full p-6 rounded-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Basic Demographics</h2>
      <div className="space-y-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={demographics.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="date">Date of Birth</Label>
          <Input
            type="date"
            name="dateOfBirth"
            value={demographics.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={demographics.gender}
            onValueChange={(value) =>
              setDemographics((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
              <SelectItem value="Prefer not to say">
                Prefer not to say
              </SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="state">State</Label>

          <Input
            type="text"
            name="state"
            placeholder="State"
            value={demographics.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="familySize">Size of Family</Label>
          <Input
            type="number"
            name="familySize"
            placeholder="Size of Family"
            value={demographics.familySize}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full mt-8 py-3 bg-indigo-900">
        Next
      </Button>
    </div>
  );
}
