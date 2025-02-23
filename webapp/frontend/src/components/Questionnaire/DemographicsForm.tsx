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

interface DemographicsFormProps {
    onNext: (demographics: DemographicsData) => void;
}

export interface DemographicsData {
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    state?: string;
}

export default function DemographicsForm({ onNext }: DemographicsFormProps) {
    const [demographics, setDemographics] = useState<DemographicsData>({
        name: "",
        dateOfBirth: "",
        gender: "",
        state: "",
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
            <div className="space-y-5">
                <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={demographics.name}
                    onChange={handleChange}
                />

                <Input
                    type="date"
                    name="dateOfBirth"
                    value={demographics.dateOfBirth}
                    onChange={handleChange}
                />

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
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={demographics.state}
                    onChange={handleChange}
                />
            </div>

            <Button onClick={handleSubmit} className="w-full mt-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold h-12 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                Next
            </Button>
        </div>
    );
}
