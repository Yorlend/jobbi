import type { DraftRepository } from '@/features/draft/services/DraftRepository'
import { db } from '../database'
import { DraftMapper } from '../mappers/DraftMapper'
import type { Draft } from '@/features/draft/models/draft'

export class DexieDraftRepository implements DraftRepository {
  async save(draft: Draft): Promise<void> {
    await db.drafts.put(DraftMapper.fromModel(draft))
  }

  async bulkSave(drafts: Draft[]): Promise<void> {
    const entities = drafts.map((draft) => DraftMapper.fromModel(draft))
    db.drafts.bulkPut(entities)
  }

  async getAll(): Promise<Draft[]> {
    const records = await db.drafts //
      .orderBy('uid')
      .toArray()

    return records.map(DraftMapper.toModel)
  }

  async delete(uid: string): Promise<void> {
    await db.drafts.delete(uid)
  }

  async drop(): Promise<void> {
    await db.drafts.clear()
  }
}
