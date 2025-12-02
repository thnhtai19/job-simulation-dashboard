'use client';

import { useSkillFilter } from "@/contexts/SkillFilterContext";
import { SkillScore } from "@/types";

interface SkillsChartProps {
  skills: SkillScore[];
}

export default function SkillsChart({ skills }: SkillsChartProps) {
  const { selectedSkill, toggleSkill, clearSkill } = useSkillFilter();

  return (
    <section className="rounded-lg border border-gray-200 bg-white/80 shadow-sm p-5 md:p-6">

        <div>
          <div className="flex items-center justify-between gap-2 w-full">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Skills radar
            </h3>
            {selectedSkill && (
              <button
                type="button"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 underline cursor-pointer"
                onClick={clearSkill}
              >
                Clear filter
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Based on your active & completed simulations
          </p>
        </div>

      <div className="mt-5 flex flex-col gap-3">
        {skills.map((skill) => {
          const isSelected = selectedSkill === skill.skill;
          return (
            <button
              key={skill.skill}
              type="button"
              onClick={() => toggleSkill(skill.skill)}
              className={`w-full rounded-lg border px-4 py-3 text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary-600 bg-primary-50/70 shadow-[0_1px_4px_rgba(0,11,172,0.15)]"
                  : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>{skill.skill}</span>
                <span className="text-gray-900">{skill.score}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-primary-600 transition-all"
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
