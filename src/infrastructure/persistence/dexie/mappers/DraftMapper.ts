import type { Draft, DraftType } from "@/features/day/models/draft";
import type { DraftEntity, DraftTypeEntity } from "../entities/DraftEntity";


export const DraftMapper = {
  toModel(draft: DraftEntity): Draft {
    return {
      uid: draft.uid,
      timestamp: new Date(draft.timestamp * 1000),
      type: draft.type as unknown as DraftType,
    }
  },

  fromModel(draft: Draft): DraftEntity {
    return {
      uid: draft.uid,
      timestamp: Math.floor(draft.timestamp.getTime() / 1000),
      type: draft.type as unknown as DraftTypeEntity,
    }
  }
}
