import Dexie, { type Table } from "dexie";
import type { DayEntity } from "./entities/DayEntity";
import type { DraftEntity } from "./entities/DraftEntity";


export class AppIndexedDB extends Dexie {
  static readonly DRAFT_ID = 'current_edit';

  days!: Table<DayEntity, string>
  drafts!: Table<DraftEntity, string>

  constructor() {
    super('app-db')

    this.version(1).stores({
      days: 'date',
      drafts: 'uid',
    })
  }
}

export const db = new AppIndexedDB()
