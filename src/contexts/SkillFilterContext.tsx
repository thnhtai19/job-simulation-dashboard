'use client';

import { createContext, useContext, useState } from "react";

interface SkillFilterContextValue {
  selectedSkill: string | null;
  toggleSkill: (skill: string) => void;
  clearSkill: () => void;
}

const SkillFilterContext = createContext<SkillFilterContextValue | undefined>(
  undefined
);

export function SkillFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkill((prev) => (prev === skill ? null : skill));
  };

  const clearSkill = () => setSelectedSkill(null);

  return (
    <SkillFilterContext.Provider
      value={{ selectedSkill, toggleSkill, clearSkill }}
    >
      {children}
    </SkillFilterContext.Provider>
  );
}

export function useSkillFilter() {
  const context = useContext(SkillFilterContext);
  if (!context) {
    throw new Error("useSkillFilter must be used within SkillFilterProvider");
  }
  return context;
}

