import type { DayRepository } from "@/features/day/services/DayRepository";
import type { DraftRepository } from "@/features/draft/services/DraftRepository";
import { DexieDayRepository } from "@/infrastructure/persistence/dexie/repository/DexieDayRepository";
import { DexieDraftRepository } from "@/infrastructure/persistence/dexie/repository/DexieDraftRepository";

const draftRepository = new DexieDraftRepository
const dayRepository = new DexieDayRepository

export const ServiceLocator = {
  draft: {
    repository: draftRepository satisfies DraftRepository,
  },
  day: {
    repository: dayRepository satisfies DayRepository,
  }
}
