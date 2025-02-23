import { DemographicsData } from "@/components/Questionnaire/DemographicsForm";
import { EmploymentData } from "@/components/Questionnaire/EmploymentForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Information from "@/components/dashboard/information";
import { Info } from "lucide-react";
import Explore from "@/components/dashboard/explore";
import Home from "@/components/dashboard/home";

export default function Dashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    demographics: DemographicsData | null;
    employment: EmploymentData | null;
    medicalHistory: Record<number, string>;
  }>({
    demographics: null,
    employment: null,
    medicalHistory: {},
  });

  const [selectedTab, setSelectedTab] = useState("home"); // Manage the selected tab state

  useEffect(() => {
    const storedData = localStorage.getItem("questionnaireData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="plans">Explore plans</TabsTrigger>
          <TabsTrigger value="information">Your information</TabsTrigger>
        </TabsList>
        <header className="flex h-4 shrink-0 items-center gap-2 border-b px-4"></header>
        <TabsContent value="home">
          <Home />
        </TabsContent>
        <TabsContent value="plans">
          <Explore />
        </TabsContent>
        <TabsContent value="information">
          <Information />
        </TabsContent>
      </Tabs>
    </div>
  );
}
