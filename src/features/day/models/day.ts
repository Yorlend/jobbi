import type { Draft } from "@/features/draft/models/draft";

export interface Day {
  date: Date,
  drafts: Draft[],
}
