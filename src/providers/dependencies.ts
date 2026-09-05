import { DexieDayRepository } from "@/infrastructure/persistence/dexie/repository/DexieDayRepository";

const dayRepository = new DexieDayRepository

export const ServiceLocator = {
  day: {
    repository: dayRepository,
  },
}
