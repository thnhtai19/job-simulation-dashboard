import { Simulation } from "@/types";

interface CertificatesSectionProps {
  simulations: Simulation[];
}

export default function CertificatesSection({
  simulations,
}: CertificatesSectionProps) {
  const completed = simulations.filter((s) => s.progress === 100);

  if (completed.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white/80 shadow-sm p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900">
        Certificates & portfolio
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Completed simulations you can showcase on your CV or LinkedIn.
      </p>

      <div className="mt-4 space-y-3">
        {completed.map((sim) => (
          <article
            key={sim.id}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3.5 flex flex-col gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start gap-3">
              <img
                src={sim.companyLogo}
                alt={sim.company}
                className="w-10 h-10 rounded-lg border border-gray-100 object-contain bg-white"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {sim.title}
                </p>
                <p className="text-xs text-gray-500">
                  {sim.company} · {sim.role}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5">
                Completed
              </span>
              <span>Difficulty: {sim.difficulty}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-primary-600 px-3 py-1 text-xs font-semibold text-primary-600 hover:bg-primary-50 cursor-pointer"
              >
                Download certificate
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Share on LinkedIn
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


