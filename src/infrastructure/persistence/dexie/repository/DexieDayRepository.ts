import type { Day } from "@/features/day/models/day";
import type { DayRepository } from "@/features/day/services/DayRepository";
import { db } from "../database";
import { DayMapper } from "../mappers/DayMapper";
import { toDateKey } from "../entities/DayEntity";


export class DexieDayRepository implements DayRepository {
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
