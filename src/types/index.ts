export interface Learner {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  learningDaysThisWeek: number;
}

export interface SimulationSkillScore {
  skill: string;
  score: number;
}

export interface Simulation {
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
  skillScores?: SimulationSkillScore[];
}

export interface SkillScore {
  skill: string;
  score: number;
}

export interface Recommendation {
  id: string;
  title: string;
  company: string;
  logo?: string;
  difficulty: string;
  estimatedTime: string;
  reason: string;
  skills: string[];
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  link?: string;
  skills: string[];
}

  