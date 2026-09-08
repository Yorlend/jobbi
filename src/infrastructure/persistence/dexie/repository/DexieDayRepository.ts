import type { Day } from "@/features/day/models/day";
import type { DayRepository } from "@/features/day/services/DayRepository";
import { AppIndexedDB, db } from "../database";
import { DayMapper } from "../mappers/DayMapper";
import { DayEntityType, toDateKey } from "../entities/DayEntity";


export class DexieDayRepository implements DayRepository {
  async getDraft(): Promise<Day | undefined> {
    const record = await db.drafts.get(DayEntityType.Draft)

    return record ? DayMapper.toModel(record) : undefined
  }

  async saveDraft(day: Day): Promise<void> {
    await db.drafts.put(DayMapper.fromModel(day, DayEntityType.Draft))
  }

  async deleteDraft(): Promise<void> {
      await db.drafts.delete(DayEntityType.Draft)
  }

  async getAll(): Promise<Day[]> {
    const records = await db.days
      .orderBy('date')
      .toArray()

    return records.map(DayMapper.toModel)
  }
  async getByDate(date: Date): Promise<Day | undefined> {
    const record = await db.days.get(toDateKey(date))

    return record ? DayMapper.toModel(record) : undefined
  }
  async save(day: Day): Promise<void> {
    await db.days.put(DayMapper.fromModel(day))
  }
  async delete(date: Date): Promise<void> {
    await db.days.delete(toDateKey(date))
  }
}
