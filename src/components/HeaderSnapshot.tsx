import Image from "next/image";
import type { HeaderSnapshotProps, KpiCardProps } from "@/types/dashboard";
import { summaryStats } from "@/data/mockData";
import { Tooltip } from "antd";
import { PlayCircle, CheckCircle2, Gauge, Flame, Info } from "lucide-react";

export default function HeaderSnapshot({
  learner,
}: HeaderSnapshotProps) {
  const { simulationsStarted, simulationsCompleted, averageScore, careerActivationRate } =
    summaryStats;

  const kpis: KpiCardProps[] = [
    {
      label: "Simulations started",
      value: simulationsStarted.toString(),
      helper: "From your library",
      icon: <PlayCircle className="w-4 h-4 text-primary-600" />,
    },
    {
      label: "Simulations completed",
      value: simulationsCompleted.toString(),
      helper: "Finished simulations",
      icon: <CheckCircle2 className="w-4 h-4 text-primary-600" />,
    },
    {
      label: "Average score",
      value: `${averageScore}%`,
      helper: "Across completed sims",
      icon: <Gauge className="w-4 h-4 text-primary-600" />,
    },
    {
      label: "Current streak",
      value: `${learner.streak} days`,
      helper: `${learner.learningDaysThisWeek} days this week`,
      icon: <Flame className="w-4 h-4 text-primary-600" />,
    },
  ];

  return (
    <section className="rounded-lg border border-gray-200 bg-white/80 shadow-sm p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          <Image
            src={learner.avatar}
            alt={learner.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border border-gray-200 shadow-sm object-cover"
          />

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {learner.name}
              </h2>
              <span className="inline-flex items-center rounded-lg bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600 border border-primary-600">
                Active learner
              </span>
            </div>
            <p className="text-sm text-gray-500">
              How are you doing{" "}
              <span className="italic">at a glance</span>?
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <div className="rounded-xl bg-gray-50 px-4 py-3 border border-dashed border-gray-200 flex flex-col gap-1.5">
            <div>
              <Tooltip
                title={
                  <div className="text-xs">
                    <p>
                      Percentage of learners who complete at least{" "}
                      <span className="font-semibold">one key career action</span>{" "}
                      within 30 days of a dashboard visit.
                    </p>
                  </div>
                }
              >
                <div className="flex items-center gap-1.5 cursor-help justify-end">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Career activation rate
                  </p>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </Tooltip>
            </div>
            <p className="text-xl font-semibold text-gray-900 text-right">
              {careerActivationRate}%
            </p>
            <p className="text-[11px] text-gray-400 text-right">
              Last 30 days
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            helper={kpi.helper}
            icon={kpi.icon}
          />
        ))}
      </div>
    </section>
  );
}

function KpiCard({ label, value, helper, icon }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3.5 py-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <div className="inline-flex items-center justify-center rounded-full bg-primary-50 w-7 h-7">
          {icon}
        </div>
      </div>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
      {helper && (
        <p className="text-xs text-gray-400">{helper}</p>
      )}
    </div>
  );
}
