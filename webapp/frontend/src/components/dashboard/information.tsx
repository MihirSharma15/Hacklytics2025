import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Importing RadioGroup components
import { DemographicsData } from "@/components/Questionnaire/DemographicsForm";
import { EmploymentData } from "@/components/Questionnaire/EmploymentForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import router from "next/router";

export default function Information() {
    const [formData, setFormData] = useState<{
        demographics: DemographicsData | null;
        employment: EmploymentData | null;
        medicalHistory: Record<number, string>;
    }>({
        demographics: null,
        employment: null,
        medicalHistory: {},
    });

    const [editableData, setEditableData] = useState<{
        demographics: DemographicsData | null;
        employment: EmploymentData | null;
        medicalHistory: Record<number, string>;
    }>({
        demographics: { name: "", dateOfBirth: "", state: "", gender: "" },
        employment: null,
        medicalHistory: {},
    });

    useEffect(() => {
        const storedData = localStorage.getItem("questionnaireData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData);
            setEditableData(parsedData);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("questionnaireData", JSON.stringify(editableData));
        setFormData(editableData);
    };

    const handleLogOut = () => {
        localStorage.setItem("questionnaireData", JSON.stringify(""));
        router.push("/");
    }

    const medicalQuestions = [
        { label: "Do you smoke?", explanation: "Do you currently smoke tobacco?", type: "radio", options: ["Yes", "No"] },
        { label: "Do you have any chronic conditions?", explanation: "List any ongoing health conditions.", type: "text" },
        { label: "How many ER trips in the last three months?", explanation: "How often have you visited the ER recently?", type: "number" },
        { label: "Do you have diabetes?", explanation: "Are you diagnosed with diabetes?", type: "radio", options: ["Yes", "No"] },
        { label: "Are you Medicare eligible?", explanation: "Are you eligible for Medicare?", type: "radio", options: ["Yes", "No"] },
        { label: "Are you Medicaid eligible?", explanation: "Are you eligible for Medicaid?", type: "radio", options: ["Yes", "No"] },
        { label: "Any prescription medications?", explanation: "List any medications you are currently taking.", type: "text" },
    ];

    const handleChange = (index: number, value: string) => {
        setEditableData({
            ...editableData,
            medicalHistory: { ...editableData.medicalHistory, [index]: value },
        });
    };

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
            <Tabs defaultValue="demographics" className="space-y-8">
                {/* Demographics Tab */}
                <TabsList className="flex space-x-4 mb-6">
                    <TabsTrigger value="demographics">Demographics</TabsTrigger>
                    <TabsTrigger value="employment">Employment</TabsTrigger>
                    <TabsTrigger value="medical-history">Medical History</TabsTrigger>
                </TabsList>

                <TabsContent value="demographics">
                    <section className="p-4 rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Demographics</h2>
                        {editableData.demographics ? (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={editableData.demographics.name}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            demographics: { ...editableData.demographics, name: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={editableData.demographics.dateOfBirth}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            demographics: { ...editableData.demographics, dateOfBirth: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        value={editableData.demographics.state}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            demographics: { ...editableData.demographics, state: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p>No demographics information provided.</p>
                        )}
                    </section>
                </TabsContent>

                {/* Employment Tab */}
                <TabsContent value="employment">
                    <section className="p-4 rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Employment Information</h2>
                        {editableData.employment ? (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="employer">Employer</Label>
                                    <Input
                                        id="employer"
                                        value={editableData.employment.employer}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            employment: { ...editableData.employment, employer: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <Input
                                        id="jobTitle"
                                        value={editableData.employment.jobTitle}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            employment: { ...editableData.employment, jobTitle: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="annualIncome">Annual Income</Label>
                                    <Input
                                        id="annualIncome"
                                        type="number"
                                        value={editableData.employment.annualIncome}
                                        onChange={(e) => setEditableData({
                                            ...editableData,
                                            employment: { ...editableData.employment, annualIncome: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p>No employment information provided.</p>
                        )}
                    </section>
                </TabsContent>

                {/* Medical History Tab */}
                <TabsContent value="medical-history">
                    <section className="p-4 rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
                        {medicalQuestions.map((question, index) => (
                            <div key={index} className="space-y-4">
                                <div>
                                    <Label htmlFor={`medical-history-${index}`}>{question.label}</Label>
                                    {question.type === "radio" && question.options && (
                                        <RadioGroup
                                            value={editableData.medicalHistory[index] || ""}
                                            onValueChange={(value) => handleChange(index, value)}
                                            className="space-y-2 mb-4"
                                        >
                                            {question.options.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={option} id={`${option}-${index}`} />
                                                    <Label htmlFor={`${option}-${index}`}>{option}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}
                                    {question.type === "text" && (
                                        <Textarea
                                            id={`medical-history-${index}`}
                                            placeholder={question.explanation}
                                            value={editableData.medicalHistory[index] || ""}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    )}
                                    {question.type === "number" && (
                                        <Input
                                            id={`medical-history-${index}`}
                                            type="number"
                                            value={editableData.medicalHistory[index] || ""}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                </TabsContent>
            </Tabs>

            <div className="flex justify-center">
                <Button className="w-32 bg-indigo-900" onClick={handleSave}>Save Changes</Button>
            </div>
            <div className="flex justify-center">
                <Button variant="outline" className="w-32" onClick={handleLogOut}>Log Out</Button>
            </div>
        </div>
    );
}
