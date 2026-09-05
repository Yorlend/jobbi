import Dexie, { type Table } from "dexie";
import type { DayEntity } from "./entities/DayEntity";


export class AppIndexedDB extends Dexie {
  days!: Table<DayEntity, string>

  constructor() {
    super('app-db')

    this.version(1).stores({
      days: 'date, workingHours, lunchHours, status'
    })
  }
}

export const db = new AppIndexedDB()
