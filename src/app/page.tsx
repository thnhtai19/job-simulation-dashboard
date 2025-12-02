import HeaderSnapshot from "@/components/HeaderSnapshot";
import SimulationList from "@/components/SimulationList";
import SkillsChart from "@/components/SkillsChart";
import Recommendations from "@/components/Recommendations";
import CertificatesSection from "@/components/CertificatesSection";
import { SkillFilterProvider } from "@/contexts/SkillFilterContext";

import {
  learner,
  simulations,
  skillScores,
  recommendations,
} from "@/data/mockData";

import { Simulation } from "@/types";
import Header from "@/components/layouts/Header";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | Job Simulation",
  description: "Job Simulation Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <SkillFilterProvider>
        <main className="p-6 flex flex-col gap-6 md:grid md:grid-cols-3 mt-16 max-w-7xl mx-auto">
          <section className="md:col-span-2 flex flex-col gap-6">
            <HeaderSnapshot
              learner={learner}
            />

            <SimulationList simulations={simulations as Simulation[]} />
            <CertificatesSection simulations={simulations as Simulation[]} />
          </section>

          <section className="flex flex-col gap-6">
            <SkillsChart skills={skillScores} />
            <Recommendations items={recommendations} />
          </section>
        </main>
      </SkillFilterProvider>
    </div>
  );
}
