'use client';

import { useMemo } from "react";
import { useSkillFilter } from "@/contexts/SkillFilterContext";
import { Simulation } from "@/types";
import { filterSimulationsBySkill } from "@/lib/simulationFilters";

interface SimulationListProps {
  simulations: Simulation[];
}

export default function SimulationList({ simulations }: SimulationListProps) {
  const { selectedSkill, clearSkill } = useSkillFilter();

  const filteredSimulations = useMemo(
    () => filterSimulationsBySkill(simulations, selectedSkill),
    [simulations, selectedSkill]
  );

  return (
    <section className="rounded-lg border border-gray-200 bg-white/80 shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            Active & completed simulations
          </h3>
          <p className="text-sm text-gray-500">
            Track progress and jump back into open sims
          </p>
        </div>
        {selectedSkill && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              {selectedSkill}
            </span>
            <button
              type="button"
              className="text-xs font-medium text-gray-500 underline hover:text-gray-700 cursor-pointer"
              onClick={clearSkill}
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {filteredSimulations.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
          {selectedSkill ? (
            <>
              No simulations contribute to{" "}
              <span className="font-semibold text-gray-700">
                {selectedSkill}
              </span>{" "}
              yet. Try selecting another skill.
            </>
          ) : (
            "You haven't started any simulations yet."
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-4">
          {filteredSimulations.map((sim) => (
            <article
              key={sim.id}
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-200 hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-3">
                <img
                  src={sim.companyLogo}
                  alt={sim.company}
                  className="w-12 h-12 rounded-lg border border-gray-100 object-contain bg-white"
                />
                <div>
                  <p className="font-semibold text-gray-900">{sim.title}</p>
                  <p className="text-xs text-gray-500">{sim.role}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 font-medium">
                  {sim.difficulty}
                </span>
                <span>Progress: {sim.progress}%</span>
                <span>Last active: {sim.lastActive ?? "—"}</span>
              </div>

              <ProgressBar value={sim.progress} />

              <div className="mt-3 flex flex-wrap gap-2">
                {sim.skills.map((skill) => {
                  const isHighlighted =
                    selectedSkill &&
                    skill.toLowerCase() === selectedSkill.toLowerCase();
                  return (
                    <span
                      key={skill}
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        isHighlighted
                          ? "border-primary-200 bg-primary-50 text-primary-700"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 w-full bg-gray-100 h-2 rounded-full">
      <div
        className="h-2 rounded-full bg-primary-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
