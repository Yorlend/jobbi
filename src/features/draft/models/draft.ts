export enum DraftType {
  Work = 'Work',
  Lunch = 'Lunch',
}

export interface Draft {
  uid: string
  title: string
  start_time: Date | undefined
  end_time: Date | undefined
  type: DraftType
}

export interface ValidationResult {
  valid: boolean
  message?: string
}

export function validateDrafts(drafts: Draft[]): ValidationResult {
  if (drafts.length === 0)
    return {
      valid: false,
      message: 'Cannot save empty drafts',
    }

  for (const draft of drafts) {
    if (!draft.start_time || !draft.end_time) {
      return {
        valid: false,
        message: `Draft "${draft.title}" must have a start and end time`,
      }
    }

    if (draft.start_time >= draft.end_time) {
      return {
        valid: false,
        message: `Draft "${draft.title}" must end after it starts`,
      }
    }
  }

  const draftsByType = new Map<DraftType, Draft[]>()

  for (const draft of drafts) {
    const draftsOfSameType = draftsByType.get(draft.type) ?? []

    draftsOfSameType.push(draft)
    draftsByType.set(draft.type, draftsOfSameType)
  }

  // Drafts of the same type must not overlap
  for (const draftsOfSameType of draftsByType.values()) {
    draftsOfSameType.sort((a, b) => {
      return a.start_time!.getTime() - b.start_time!.getTime()
    })

    for (let i = 1; i < draftsOfSameType.length; i++) {
      const previousDraft = draftsOfSameType[i - 1]
      const currentDraft = draftsOfSameType[i]

      if (!previousDraft || !currentDraft) {
        continue
      }

      if (currentDraft.start_time! < previousDraft.end_time!) {
        return {
          valid: false,
          message: `Draft "${currentDraft.title}" overlaps "${previousDraft.title}"`,
        }
      }
    }
  }

  // Every Lunch must be inside a Work interval
  const workDrafts = drafts.filter((draft) => draft.type === DraftType.Work)
  const lunchDrafts = drafts.filter((draft) => draft.type === DraftType.Lunch)

  for (const lunchDraft of lunchDrafts) {
    const isInsideWork = workDrafts.some((workDraft) => {
      return (
        lunchDraft.start_time! >= workDraft.start_time! &&
        lunchDraft.end_time! <= workDraft.end_time!
      )
    })

    if (!isInsideWork) {
      return {
        valid: false,
        message: `Lunch draft "${lunchDraft.title}" must be inside a Work interval`,
      }
    }
  }

  return {
    valid: true,
  }
}
