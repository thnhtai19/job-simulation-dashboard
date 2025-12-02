import type { Learner } from "@/types";

export interface HeaderSnapshotProps {
  learner: Learner;
}

export interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: React.ReactNode;
}


