import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added Shadcn Select component
import { useState } from "react";

const insurancePlans = [
    { id: 1, name: "Premium Plus Plan" },
    { id: 2, name: "Basic Plan" },
    { id: 3, name: "Family Care Plan" },
    { id: 4, name: "Silver Plan" },
];

export default function Home() {
    const [selectedPlan, setSelectedPlan] = useState(insurancePlans[0]);

    return (
        <SidebarProvider>
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="w-full max-w-sm">
                        <Select
                            onValueChange={(value) => {
                                const plan = insurancePlans.find((plan) => plan.id.toString() === value);
                                if (plan) setSelectedPlan(plan);
                            }}
                            value={selectedPlan.id.toString()}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                            <SelectContent>
                                {insurancePlans.map((plan) => (
                                    <SelectItem key={plan.id} value={plan.id.toString()}>
                                        {plan.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-center">
                            <p>{selectedPlan.name} Coverage Overview</p>
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-center">
                            <p>Deductible: $500</p>
                        </div>
                        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-center">
                            <p>Out-of-Pocket Max: $2000</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col items-center justify-center p-4">
                            <p className="text-lg font-semibold">Monthly Budget Recommendation</p>
                            <p className="text-2xl">${(selectedPlan.id * 50 + 100).toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col aspect-video rounded-xl bg-muted/50 p-4 gap-3">
                            <button className="bg-indigo-900 text-white rounded-lg py-2 font-medium">Submit new claim</button>
                            {["Claim One", "Claim Two"].map((claim, index) => (
                                <button
                                    key={claim}
                                    className="bg-white rounded-lg py-2 border shadow-sm flex justify-between px-4 text-left"
                                >
                                    <div>
                                        <p className="font-semibold">{claim}</p>
                                        <p className="text-sm text-muted-foreground">Submitted: {`2024-0${index + 2}-15`}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
