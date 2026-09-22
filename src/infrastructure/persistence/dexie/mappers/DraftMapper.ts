import type { Draft, DraftType } from "@/features/draft/models/draft";
import type { DraftEntity, DraftTypeEntity } from "../entities/DraftEntity";


export const DraftMapper = {
  toModel(draft: DraftEntity): Draft {
    return {
      uid: draft.uid,
      title: draft.title,
      start_time: draft.start_ts ? new Date(draft.start_ts * 1000) : undefined,
      end_time: draft.end_ts ? new Date(draft.end_ts * 1000) : undefined,
      type: draft.type as unknown as DraftType,
    }
  },

  fromModel(draft: Draft): DraftEntity {
    return {
      uid: draft.uid,
      title: draft.title,
      start_ts: draft.start_time ? Math.floor(draft.start_time.getTime() / 1000) : undefined,
      end_ts: draft.end_time ? Math.floor(draft.end_time.getTime() / 1000) : undefined,
      type: draft.type as unknown as DraftTypeEntity,
    }
  }
}
