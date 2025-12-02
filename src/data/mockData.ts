import { Simulation, SimulationSkillScore, SkillScore } from "@/types";

export const learner = {
  id: "learner_01",
  name: "Trần Thành Tài",
  avatar: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/480725741_1185837756218894_5284244109698900075_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Yb-8P-j54b4Q7kNvwE9VJ0u&_nc_oc=Adm7GVV5PSboZS2jsMbq9rIm5wRosoSPMZnUSFO7kQAivbUnwyzbV6-aoW9oigPM1_H46WsJfIXtSFqQkmSGE626&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=dWzB6V0nYXkL03ym6-sSsg&oh=00_AfhSAHdR2KJD3YayRn5emoE0WxIsSQ_LUgeWWcgFT1SGvg&oe=69338ACF",
  streak: 7,
  learningDaysThisWeek: 4,
};

export const simulations: Simulation[] = [
  {
    id: "sim_fe_01",
    title: "Frontend React Developer Simulation",
    company: "TechNova Labs",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    role: "Junior Frontend Engineer",
    difficulty: "Beginner",
    progress: 100,
    lastActive: "2025-01-12",
    skills: ["React", "JavaScript", "UI Implementation"],
    status: "Completed",
    skillScores: [
      { skill: "React", score: 90 },
      { skill: "JavaScript", score: 78 },
      { skill: "UI Implementation", score: 75 },
    ],
  },
  {
    id: "sim_be_01",
    title: "Node.js API & Database Simulation",
    company: "CloudScale Systems",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    role: "Backend Developer",
    difficulty: "Intermediate",
    progress: 100,
    lastActive: "2025-01-08",
    skills: ["Node.js", "Databases", "API Design"],
    status: "Completed",
    skillScores: [
      { skill: "Node.js", score: 88 },
      { skill: "Databases", score: 74 },
      { skill: "API Design", score: 81 },
    ],
  },
  {
    id: "sim_ds_01",
    title: "Data Analysis with Python Simulation",
    company: "Insight Analytics",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    role: "Data Analyst Intern",
    difficulty: "Intermediate",
    progress: 60,
    lastActive: "2025-01-05",
    skills: ["Python", "Data Analysis", "Visualization"],
    status: "In Progress",
  },
  {
    id: "sim_devops_01",
    title: "DevOps CI/CD Pipeline Simulation",
    company: "CloudOps Studio",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Devops-toolchain.svg",
    role: "DevOps Engineer",
    difficulty: "Advanced",
    progress: 0,
    lastActive: null,
    skills: ["CI/CD", "Docker", "Monitoring"],
    status: "Not Started",
  },
];

const completedSkillEntries: SimulationSkillScore[] = simulations
  .filter((s) => s.progress === 100)
  .flatMap((sim) => sim.skillScores ?? []);

const skillScoreMap: Record<string, { total: number; count: number }> = {};

for (const { skill, score } of completedSkillEntries) {
  if (!skillScoreMap[skill]) {
    skillScoreMap[skill] = { total: 0, count: 0 };
  }
  skillScoreMap[skill].total += score;
  skillScoreMap[skill].count += 1;
}

export const skillScores: SkillScore[] = Object.entries(skillScoreMap).map(
  ([skill, { total, count }]) => ({
    skill,
    score: Math.round(total / Math.max(1, count)),
  })
);

export const recommendations = [
  {
    id: "rec_01",
    title: "TypeScript Fundamentals for React",
    company: "TechNova Labs",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    difficulty: "Beginner",
    estimatedTime: "60 mins",
    reason: "Strengthens your typing skills for modern React codebases.",
    skills: ["TypeScript", "React"],
  },
  {
    id: "rec_02",
    title: "Design RESTful APIs with Express",
    company: "CloudScale Systems",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    difficulty: "Intermediate",
    estimatedTime: "75 mins",
    reason: "Deepens your Node.js and API Design experience.",
    skills: ["Node.js", "API Design"],
  },
  {
    id: "rec_03",
    title: "Docker & Containerization Basics",
    company: "CloudOps Studio",
    logo:
      "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    difficulty: "Intermediate",
    estimatedTime: "90 mins",
    reason: "Helps you prepare for DevOps workflows and CI/CD pipelines.",
    skills: ["Docker", "CI/CD"],
  },
];

export const jobRecommendations = [
  {
    id: "job_01",
    title: "Junior Frontend Engineer (React)",
    company: "TechNova Labs",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    location: "Ho Chi Minh City · Hybrid",
    link: "#",
    skills: ["React", "JavaScript", "TypeScript", "UI Implementation"],
  },
  {
    id: "job_02",
    title: "Backend Node.js Developer",
    company: "CloudScale Systems",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    location: "Remote · Vietnam",
    link: "#",
    skills: ["Node.js", "Databases", "API Design"],
  },
  {
    id: "job_03",
    title: "Data Analyst (Python)",
    company: "Insight Analytics",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    location: "Ho Chi Minh City · On-site",
    link: "#",
    skills: ["Python", "Data Analysis", "Visualization"],
  },
];

const simulationsStarted = simulations.filter((s) => s.progress > 0).length;
const simulationsCompleted = simulations.filter(
  (s) => s.progress === 100
).length;
const completedSimulations = simulations.filter((s) => s.progress === 100);

const averageScore =
  completedSkillEntries.length === 0
    ? 0
    : Math.round(
        completedSkillEntries.reduce((acc, entry) => acc + entry.score, 0) /
          completedSkillEntries.length
      );

const dashboardVisitorsSampleSize = 120;
const learnersWithCareerAction = 78;
const careerActivationRate = Math.round(
  (learnersWithCareerAction / dashboardVisitorsSampleSize) * 100
);

export const lowestSkillNames = [...skillScores]
  .sort((a, b) => a.score - b.score)
  .slice(0, 3)
  .map((s) => s.skill);

export const summaryStats = {
  simulationsStarted,
  simulationsCompleted,
  averageScore,
  completedSimulations,
  dashboardVisitorsSampleSize,
  learnersWithCareerAction,
  careerActivationRate,
};


