import type { Day } from "../models/day";


export interface DayRepository {
  getAll(): Promise<Day[]>
  getByDate(date: Date): Promise<Day | undefined>
  save(day: Day): Promise<void>
  delete(date: Date): Promise<void>
}
