import type { DraftRepository } from '@/features/day/services/DraftRepository'
import { db } from '../database'
import { DraftMapper } from '../mappers/DraftMapper'
import type { Draft } from '@/features/day/models/draft'

export class DexieDraftRepository implements DraftRepository {
  async save(draft: Draft): Promise<void> {
    await db.drafts.put(DraftMapper.fromModel(draft))
  }

  async getAll(): Promise<Draft[]> {
    const records = await db.drafts //
      .orderBy('timestamp')
      .toArray()

    return records.map(DraftMapper.toModel)
  }

  async delete(uuid: string): Promise<void> {
    await db.drafts.delete(uuid)
  }

  async drop(): Promise<void> {
    await db.drafts.clear()
  }
}
