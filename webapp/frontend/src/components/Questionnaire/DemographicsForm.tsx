import { useState } from "react";

interface DemographicsFormProps {
    onNext: (demographics: DemographicsData) => void;
}

export interface DemographicsData {
    name: string;
    dateOfBirth: string;
    gender: string;
    race: string;
}

export default function DemographicsForm({ onNext }: DemographicsFormProps) {
    const [demographics, setDemographics] = useState<DemographicsData>({
        name: "",
        dateOfBirth: "",
        gender: "",
        race: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDemographics((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onNext(demographics);
    };

    return (
        <div className="p-4 border rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Basic Demographics</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={demographics.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-xl"
                />

                <input
                    type="date"
                    name="dateOfBirth"
                    value={demographics.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-xl"
                />

                <select
                    name="gender"
                    value={demographics.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-xl"
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    name="race"
                    placeholder="Race (e.g., Asian, Black, White, etc.)"
                    value={demographics.race}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-xl"
                />
            </div>

            <button onClick={handleSubmit} className="w-full mt-6">Next</button>
        </div>
    );
}