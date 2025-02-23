import { useState } from "react";

interface DependentsFormProps {
    onNext: (dependents: DependentData[]) => void;
    onBack: () => void;
}

export interface DependentData {
    name: string;
    relationship: string;
    dateOfBirth: string;
}

export default function DependentsForm({ onNext, onBack }: DependentsFormProps) {
    const [dependents, setDependents] = useState<DependentData[]>([]);
    const [newDependent, setNewDependent] = useState<DependentData>({ name: "", relationship: "", dateOfBirth: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDependent((prev) => ({ ...prev, [name]: value }));
    };

    const addDependent = () => {
        if (newDependent.name && newDependent.relationship && newDependent.dateOfBirth) {
            setDependents((prev) => [...prev, newDependent]);
            setNewDependent({ name: "", relationship: "", dateOfBirth: "" });
        }
    };

    return (
        <div className="p-4 border rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Dependents Information</h2>
            <div className="space-y-4">
                <input type="text" name="name" placeholder="Dependent Name" value={newDependent.name} onChange={handleChange} className="w-full p-2 border rounded-xl" />
                <input type="text" name="relationship" placeholder="Relationship (e.g., Child, Spouse)" value={newDependent.relationship} onChange={handleChange} className="w-full p-2 border rounded-xl" />
                <input type="date" name="dateOfBirth" value={newDependent.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded-xl" />
                <button onClick={addDependent} className="w-full">Add Dependent</button>
            </div>
            {dependents.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {dependents.map((dep, index) => (
                        <li key={index} className="p-2 border rounded-xl">
                            {dep.name} - {dep.relationship} (DOB: {dep.dateOfBirth})
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-between mt-6">
                <button onClick={onBack}>Back</button>
                <button onClick={() => onNext(dependents)}>Next</button>
            </div>
        </div>
    );
}