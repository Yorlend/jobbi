import type { Draft } from "../models/draft";


export interface DraftRepository {
  save(draft: Draft): Promise<void>
  getAll(): Promise<Draft[]>
  delete(uuid: string): Promise<void>
  drop(): Promise<void>
}
