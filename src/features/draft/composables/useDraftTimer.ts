import type { Draft } from "../models/draft";

export function useDraftTimer() {
  const toggleTimer = (draft: Draft): Draft => {
    const now = new Date()

    if (!draft.start_time) {
      return {
        ...draft,
        start_time: now,
        end_time: undefined,
      }
    }

    if (!draft.end_time) {
      return {
        ...draft,
        end_time: now,
      }
    }

    return draft
  }

  const canToggle = (draft: Draft): boolean => {
    return !draft.start_time || !draft.end_time
  }

  return { toggleTimer, canToggle }
}
