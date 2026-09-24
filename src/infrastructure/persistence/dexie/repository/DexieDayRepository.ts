import type { Day } from '@/features/day/models/day'
import type { DayRepository } from '@/features/day/services/DayRepository'
import { DraftMapper } from '../mappers/DraftMapper'
import { db } from '../database'
import { getDateFromTime } from '@/util/time'

export class DexieDayRepository implements DayRepository {
  async getByDate(date: Date): Promise<Day | undefined> {
    const day_start = new Date(date)
    day_start.setHours(0, 0, 0, 0)
    const start_ts = Math.floor(day_start.getTime() / 1000)

    const day_end = new Date(date)
    day_end.setHours(23, 59, 59, 0)
    const end_ts = Math.floor(day_end.getTime() / 1000)

    const entities = await db.days
      .where('start_ts')
      .between(start_ts, end_ts, true, false)
      .toArray()

    return {
      date,
      drafts: entities.map((entity) => DraftMapper.toModel(entity)),
    }
  }

  async save(day: Day): Promise<void> {
    await this.delete(day.date)

    day.drafts.forEach((d) => {
      d.start_time?.setFullYear(day.date.getFullYear(), day.date.getMonth(), day.date.getDate())
      d.end_time?.setFullYear(day.date.getFullYear(), day.date.getMonth(), day.date.getDate())
    })

    const entities = day.drafts.map((d) => DraftMapper.fromModel(d))
    await db.days.bulkPut(entities)
  }

  async delete(date: Date): Promise<void> {
    const day_start = new Date(date)
    day_start.setHours(0, 0, 0, 0)
    const start_ts = Math.floor(day_start.getTime() / 1000)

    const day_end = new Date(date)
    day_end.setHours(23, 59, 59, 0)
    const end_ts = Math.floor(day_end.getTime() / 1000)

    await db.days //
      .where('start_ts')
      .between(start_ts, end_ts, true, false)
      .delete()
  }
}
