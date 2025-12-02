## Job Simulation Dashboard – SWE Intern Frontend Take‑home

Dashboard for Edtronaut's AI-enabled Job Simulation platform (Step 5 – Learner Dashboard).  
It answers: **“Where am I now, how am I progressing, and what should I do next?”**

---

### How to run locally

- **Install dependencies**

```bash
npm install
```

- **Run dev server**

```bash
npm run dev
```

App runs at `http://localhost:3000`

- **Run tests**

```bash
npm test
```

This runs Jest unit tests (currently for the skill → simulation filtering logic).

---

### Deployed demo

- Live demo (Vercel):
  - ``

---

### Architecture & folder structure

- **App & layout**
  - `src/app/page.tsx`: main dashboard page (SSR).  
  - `src/app/layout.tsx`: root layout, fonts + global styles.

- **Core components**
  - `src/components/HeaderSnapshot.tsx`  
    - Learner avatar, greeting, KPI cards (Started, Completed, Avg score, Streak).  
    - Shows **Career Activation Rate** with tooltip explaining the industry definition.
  - `src/components/SimulationList.tsx`  
    - “Active & completed simulations” list grouped by status (implicitly via badges).  
    - Shows title, company logo/name, role, difficulty, last active date, progress bar, tags.  
    - Respects current skill filter (see `SkillFilterContext`) and has empty states.
  - `src/components/SkillsChart.tsx`  
    - Horizontal bar chart (“Skills radar”) showing 4–8 skills with 0–100 scores.  
    - Clicking a skill filters `SimulationList`; “Clear filter” badge resets.
  - `src/components/Recommendations.tsx`  
    - Right column “What should I do next?” panel.  
    - Simulation recommendations + optional **Job recommendations** (bonus).
  - `src/components/CertificatesSection.tsx` (bonus)  
    - “Certificates & portfolio” panel listing completed simulations with  
      **Download certificate** / **Share on LinkedIn** buttons (UI only).
  - `src/components/layouts/Header.tsx`  
    - Top nav with logo.

- **State & logic**
  - `src/contexts/SkillFilterContext.tsx`  
    - Stores `selectedSkill` and exposes `toggleSkill` / `clearSkill`.  
    - Used by `SkillsChart` (to set/clear filter) and `SimulationList` / `Recommendations` (to react).
  - `src/lib/simulationFilters.ts`  
    - Pure function `filterSimulationsBySkill(simulations, selectedSkill)` used by `SimulationList`.  
    - Covered by Jest tests in `__tests__/simulationFilters.test.ts`.
  - `src/lib/recommendations.ts`  
    - `scoreBySkills` and `uniqueById` helper functions to rank and de‑duplicate simulation/job recommendations based on focus skills.

- **Data / mocks & types**
  - `src/data/mockData.ts`  
    - IT-focused mock data for learner, simulations, skills, simulation recommendations, and job recommendations.  
    - Computes derived metrics (`summaryStats`, `skillScores`, `lowestSkillNames`) used by UI.
  - `src/types/index.ts`  
    - Shared domain types (`Learner`, `Simulation`, `SimulationSkillScore`, `SkillScore`, `Recommendation`, `JobRecommendation`).
  - `src/types/dashboard.ts`  
    - View-specific types for dashboard components (`HeaderSnapshotProps`, `KpiCardProps`).

---

### Data model & how metrics are computed

- **Simulations (`Simulation`)**
  - Fields: `id`, `title`, `company`, `companyLogo`, `role`, `difficulty`, `progress`, `lastActive`, `skills`, `status`.
  - Optional `skillScores?: SimulationSkillScore[]`:
    - `SimulationSkillScore = { skill: string; score: number }`.
    - Only **completed** simulations have `skillScores` – in‑progress ones don’t.

- **Skill radar scores (`skillScores`)**
  - Derived in `mockData.ts` by:
    1. Taking all `skillScores` from simulations with `progress === 100`.  
    2. Grouping by `skill`.  
    3. Averaging `score` per skill.  
  - `SkillsChart` receives this aggregated `skillScores` and renders horizontal bars.

- **Average score (Header KPI)**
  - `averageScore` in `summaryStats` is computed as:
    - Average of **all** `score` values in `skillScores` of completed simulations.

- **Career Activation Rate**
  - Mocked with realistic numbers but follows the brief’s formula:  
    `learnersWithCareerAction / dashboardVisitorsSampleSize` (×100 and rounded).
  - Displayed in `HeaderSnapshot` with a tooltip summarising the definition and formula.

- **Recommendations logic**
  - **Focus skills**:
    - If a skill is selected in `SkillsChart` → focus on that skill only.  
    - Otherwise → `lowestSkillNames` = 3 skills with the lowest radar scores (skill gaps).
  - **scoreBySkills**:
    - For each simulation/job: count how many of its `skills` overlap with `focusSkills`.  
    - Sort items in descending order of overlap.
  - **Simulation Recommendations**:
    - Take the top 3 simulations using `scoreBySkills(items, focus)`.  
    - If there are fewer than 3, fill from the original `items` and use `uniqueById` to avoid duplicates.  
    - Each card shows: title, company, difficulty, estimated time, and a “Why recommended” explanation with skill chips.
  - **Job Recommendations** (bonus):
    - Score jobs the same way with `jobRecommendations`.  
    - If no jobs match the focus skills, fall back to the first 3 mock jobs.

- **Skill → Simulation filtering**
  - `SkillsChart` calls `toggleSkill(skillName)` in the context.  
  - `SimulationList` uses `filterSimulationsBySkill`:
    - If `selectedSkill` is null → return all simulations.  
    - If there is a selected skill → only keep simulations whose `skills` array contains that skill (case‑insensitive).

---

### Features implemented vs brief

- **2.1 Header Snapshot – DONE**
  - Learner name & avatar.
  - Welcome tagline.
  - KPI cards:
    - Simulations started.
    - Simulations completed.
    - Average score (from `skillScores` of completed simulations).
    - Current streak / learning days this week.
  - Career Activation Rate with tooltip explanation.

- **2.2 Active & Completed Simulations – DONE**
  - Card list showing:
    - Title, company logo/name, role.
    - Difficulty.
    - Last activity date.
    - Progress bar (% complete).
  - Status tags: In Progress / Completed / Not Started.
  - Empty states:
    - No simulations yet.
    - No simulations matching the current skill filter.

- **2.3 Skills Radar / Bar Chart – DONE**
  - 4–8 skills (React, Node.js, Databases, Python, etc.) with 0–100 scores from the aggregated mock data.  
  - Uses horizontal bars for readability.  
  - Interaction:
    - Clicking a skill filters `SimulationList`.  
    - “Clear filter” button resets the selection.

- **2.4 Recommendations Panel – DONE (including bonus Job Recs)**
  - Simulation Recommendations:
    - ≥3 simulations with: title, company, difficulty, estimated time, and a “Why recommended” reason.  
    - Logic based on skill gaps (lowest skills) or the currently selected skill.
  - Job Recommendations (bonus):
    - Mock job cards: title, company, location, key skills.  
    - Conceptually linked to simulations (React → Frontend role, Node.js → Backend, Python → Data).

- **2.5 Optional Nice‑to‑Have – PARTIAL**
  - Certificates / Portfolio Section – **IMPLEMENTED**.  
  - Total Minutes Spent Heatmap – **NOT IMPLEMENTED**.

- **2.6 Technical Specs**
  - Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
  - Simple React Context for shared state; no heavy state libraries.
  - Responsive:
    - Mobile: single column.  
    - Desktop: left column (Header, Simulations, Certificates), right column (Skills radar, Recommendations).
  - Accessibility:
    - Semantic sections, clear heading hierarchy.  
    - All charts have text labels and skill chips as textual equivalents.

---

### Tests

- **Unit test**:
  - `__tests__/simulationFilters.test.ts`:
    - Tests `filterSimulationsBySkill`:
      - When no skill is selected → returns all simulations.  
      - When `"react"` is selected → returns only simulations with React in their `skills` (case‑insensitive).  
      - When a non-existent skill is selected → returns an empty array.

---

### If I had more time

- Add a compact **minutes spent heatmap** in the right column, using mock minutes per day/week.  
- Add **cohort comparison** (e.g. "Top 30% of learners for React") based on mock distributions.  
- Extend recommendation and summary logic in `src/lib` with additional unit tests (e.g. for `scoreBySkills`).  
- Add a modal or dedicated route to show detailed simulation and skill breakdowns.
- **Skill gap analysis**: Visualize which skills are needed for target job roles but are currently missing, with actionable recommendations to bridge the gap.