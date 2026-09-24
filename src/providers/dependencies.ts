import type { DayRepository } from "@/features/day/services/DayRepository";
import type { DraftRepository } from "@/features/draft/services/DraftRepository";
import { DexieDraftRepository } from "@/infrastructure/persistence/dexie/repository/DexieDraftRepository";

const draftRepository = new DexieDraftRepository

export const ServiceLocator = {
  draft: {
    repository: draftRepository satisfies DraftRepository,
  },
}
