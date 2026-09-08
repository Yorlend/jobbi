import type { Day } from "../models/day";


export interface DayRepository {
  getDraft(): Promise<Day | undefined>
  saveDraft(day: Day): Promise<void>
  deleteDraft(): Promise<void>
  getAll(): Promise<Day[]>
  getByDate(date: Date): Promise<Day | undefined>
  save(day: Day): Promise<void>
  delete(date: Date): Promise<void>
}
