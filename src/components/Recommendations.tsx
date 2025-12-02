'use client';

import { useMemo } from "react";
import { JobRecommendation, Recommendation } from "@/types";
import { jobRecommendations, lowestSkillNames } from "@/data/mockData";
import { useSkillFilter } from "@/contexts/SkillFilterContext";
import { scoreBySkills, uniqueById } from "@/lib/recommendations";

interface RecommendationsProps {
  items: Recommendation[];
}

export default function Recommendations({ items }: RecommendationsProps) {
  const { selectedSkill } = useSkillFilter();

  const {
    simulationRecsToShow,
    jobRecsToShow,
    focusSkills,
  }: {
    simulationRecsToShow: Recommendation[];
    jobRecsToShow: JobRecommendation[];
    focusSkills: string[];
  } = useMemo(() => {
    const focus = selectedSkill ? [selectedSkill] : lowestSkillNames;

    const simScored = scoreBySkills(items, focus, 3);
    const jobScored = scoreBySkills(jobRecommendations, focus, 3);

    const mergedSim = simScored.length >= 3 ? simScored : [...simScored, ...items];
    const finalSimRecs = uniqueById(mergedSim).slice(0, 3);

    const finalJobRecs =
      jobScored.length > 0 ? jobScored : jobRecommendations.slice(0, 3);

    return {
      simulationRecsToShow: finalSimRecs,
      jobRecsToShow: finalJobRecs,
      focusSkills: focus,
    };
  }, [items, selectedSkill]);

  return (
    <section className="rounded-lg border border-gray-200 bg-white/80 shadow-sm p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900">
        What should I do next?
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Simulation recommendations based on your skill gaps
        {selectedSkill ? " and current focus" : ""}.
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-gray-500">
        <span className="font-semibold text-gray-600">Focus skills:</span>
        {focusSkills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {simulationRecsToShow.map((rec) => (
          <article
            key={rec.id}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-primary-200 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between gap-3">
              <div className="flex items-center gap-3">
                {rec.logo && (
                  <img
                    src={rec.logo}
                    alt={rec.company}
                    className="w-12 h-12 rounded-lg border border-gray-100 object-contain bg-white"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {rec.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{rec.company}</p>
                    <p className="text-xs text-gray-500">|</p>
                    <p className="text-xs text-gray-500">{rec.difficulty}</p>
                    <p className="text-xs text-gray-500">|</p>
                    <p className="text-xs text-gray-500">{rec.estimatedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">
                Why recommended:
              </span>{" "}
              {rec.reason}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {rec.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Job recommendations
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          Roles that conceptually connect to your simulations and focus skills.
        </p>

        <div className="space-y-3">
          {jobRecsToShow.map((job) => (
            <article
              key={job.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-primary-200 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between gap-3">
                <div className="flex items-start gap-3">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg border border-gray-100 object-contain bg-white"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{job.company}</p>
                      <p className="text-xs text-gray-500">|</p>
                      <p className="text-[11px] text-gray-500 text-right">
                        {job.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
