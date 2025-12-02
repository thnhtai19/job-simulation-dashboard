import { Simulation } from "@/types";

export function filterSimulationsBySkill(
  simulations: Simulation[],
  selectedSkill: string | null
): Simulation[] {
  if (!selectedSkill) return simulations;

  const target = selectedSkill.toLowerCase();
  return simulations.filter((sim) =>
    sim.skills?.some((skill) => skill.toLowerCase() === target)
  );
}


