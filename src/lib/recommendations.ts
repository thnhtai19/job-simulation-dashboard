import { JobRecommendation, Recommendation } from "@/types";

export function scoreBySkills<T extends { id: string; skills: string[] }>(
  items: T[],
  focusSkills: string[],
  max = 3
): T[] {
  const scored = items
    .map((item) => {
      const overlapCount = item.skills.filter((skill) =>
        focusSkills.some(
          (f) => f.toLowerCase().trim() === skill.toLowerCase().trim()
        )
      ).length;
      return { item, overlapCount };
    })
    .filter((entry) => entry.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, max)
    .map((entry) => entry.item);

  return scored;
}

export function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }
  return result;
}

export interface RecommendationResult {
  simulationRecsToShow: Recommendation[];
  jobRecsToShow: JobRecommendation[];
  focusSkills: string[];
}


