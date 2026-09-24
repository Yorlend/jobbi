import Dexie, { type Table } from "dexie";
import type { DraftEntity } from "./entities/DraftEntity";


export class AppIndexedDB extends Dexie {
  days!: Table<DraftEntity, string>
  drafts!: Table<DraftEntity, string>

  constructor() {
    super('app-db')

    this.version(1).stores({
      days: 'uid, start_ts',
      drafts: 'uid',
    })
  }
}

export const db = new AppIndexedDB()
