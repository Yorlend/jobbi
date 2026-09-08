import Dexie, { type Table } from "dexie";
import type { DayEntity } from "./entities/DayEntity";


export class AppIndexedDB extends Dexie {
  static readonly DRAFT_ID = 'current_edit';

  days!: Table<DayEntity, string>
  drafts!: Table<DayEntity, string>

  constructor() {
    super('app-db')

    this.version(1).stores({
      days: 'date',
      drafts: 'type'
    })
  }
}

export const db = new AppIndexedDB()
