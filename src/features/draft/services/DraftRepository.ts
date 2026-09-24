import type { Draft } from "../models/draft";


export interface DraftRepository {
  save(draft: Draft): Promise<void>
  bulkSave(drafts: Draft[]): Promise<void>
  getAll(): Promise<Draft[]>
  delete(uid: string): Promise<void>
  drop(): Promise<void>
}
