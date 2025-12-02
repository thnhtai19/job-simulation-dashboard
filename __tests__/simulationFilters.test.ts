import { filterSimulationsBySkill } from "@/lib/simulationFilters";

interface TestSimulation {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  role: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  lastActive: string | null;
  skills: string[];
  status: "In Progress" | "Completed" | "Not Started";
}

const mockSimulations: TestSimulation[] = [
  {
    id: "sim_1",
    title: "React UI Challenge",
    company: "TechNova",
    companyLogo: "",
    role: "Frontend Intern",
    difficulty: "Beginner",
    progress: 100,
    lastActive: "2025-01-10",
    skills: ["React", "JavaScript"],
    status: "Completed",
  },
  {
    id: "sim_2",
    title: "Node.js API Sprint",
    company: "CloudScale",
    companyLogo: "",
    role: "Backend Intern",
    difficulty: "Intermediate",
    progress: 60,
    lastActive: "2025-01-08",
    skills: ["Node.js", "Databases"],
    status: "In Progress",
  },
];

describe("filterSimulationsBySkill", () => {
  it("returns all simulations when no skill is selected", () => {
    const result = filterSimulationsBySkill(mockSimulations, null);
    expect(result).toHaveLength(2);
  });

  it("filters simulations by exact skill name (case-insensitive)", () => {
    const result = filterSimulationsBySkill(mockSimulations, "react");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sim_1");
  });

  it("returns empty array when no simulations match the skill", () => {
    const result = filterSimulationsBySkill(mockSimulations, "Docker");
    expect(result).toHaveLength(0);
  });
});


