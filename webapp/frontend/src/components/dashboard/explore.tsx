import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const insurancePlans = [
    {
        id: 1,
        name: "Premium Plus Plan",
        company: "InsuranceCo",
        description: "Best coverage for individuals and families.",
        price: 200,
        isBest: true,
    },
    {
        id: 2,
        name: "Basic Plan",
        company: "BudgetCare",
        description: "Affordable plan with essential coverage.",
        price: 120,
        isBest: false,
    },
    {
        id: 3,
        name: "Family Care Plan",
        company: "FamilyHealth",
        description: "Great coverage for families with children.",
        price: 180,
        isBest: false,
    },
    {
        id: 4,
        name: "Silver Plan",
        company: "SilverLine Insurance",
        description: "Moderate coverage with low out-of-pocket costs.",
        price: 150,
        isBest: false,
    },
];

export default function Explore() {
    const bestPlan = insurancePlans.find((plan) => plan.isBest);
    const otherPlans = insurancePlans.filter((plan) => !plan.isBest);

    return (
        <div className=" mx-auto space-y-10 p-6">
            {bestPlan && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">The best insurance plan for you</h2>
                    <Card className="p-4 shadow-md rounded-2xl">
                        <CardHeader className="flex justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold">{bestPlan.name}</CardTitle>
                                <CardDescription className="text-sm text-gray-600">{bestPlan.company}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-2">
                            <p className="text-lg font-medium">${bestPlan.price}/month</p>
                            <p className="text-base">{bestPlan.description}</p>
                        </CardContent>
                        <CardFooter className="mt-4">
                            <Button variant="outline" className="text-sm w-full">Learn More</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Other plans to explore</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {otherPlans.map((plan) => (
                        <Card key={plan.id} className="p-4 shadow-sm rounded-2xl">
                            <CardHeader className="flex justify-between">
                                <div>
                                    <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600">{plan.company}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-2">
                                <p className="text-base">{plan.description}</p>

                                <p className="text-lg font-medium">${plan.price}/month</p>
                            </CardContent>
                            <CardFooter className="mt-4">
                                <Button variant="outline" className="w-full text-sm">Learn More</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
