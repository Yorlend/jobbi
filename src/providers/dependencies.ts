import type { DayRepository } from "@/features/day/services/DayRepository";
import type { DraftRepository } from "@/features/day/services/DraftRepository";
import { DexieDayRepository } from "@/infrastructure/persistence/dexie/repository/DexieDayRepository";
import { DexieDraftRepository } from "@/infrastructure/persistence/dexie/repository/DexieDraftRepository";

const dayRepository = new DexieDayRepository
const draftRepository = new DexieDraftRepository

export const ServiceLocator = {
  day: {
    repository: dayRepository satisfies DayRepository,
  },
  draft: {
    repository: draftRepository satisfies DraftRepository,
  },
}
