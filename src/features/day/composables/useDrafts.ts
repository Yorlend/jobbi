import { ref } from "vue";
import { type Draft } from "../models/draft";
import { ServiceLocator } from "@/providers/dependencies";


export function useDrafts() {
  const drafts = ref<Draft[]>([])

  const repo = ServiceLocator.draft.repository

  async function onSave(draft: Draft) {
    const idx = drafts.value.findIndex(item => item.uid === draft.uid)

    if (idx === -1) {
      drafts.value.push(draft)
    } else {
      drafts.value[idx] = draft
    }

    repo.save(draft)
  }

  async function onDelete(uuid: string) {
    const idx = drafts.value.findIndex(item => item.uid === uuid)

    if (idx !== -1) {
      drafts.value.splice(idx, 1)
    }
  }

  return {
    drafts,
    onSave,
    onDelete,
  }
}
