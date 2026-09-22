import { onMounted, ref } from "vue";
import { type Draft } from "../../draft/models/draft";
import { ServiceLocator } from "@/providers/dependencies";


export function useDrafts() {
  const drafts = ref<Draft[]>([])
  const showSaveDialog = ref(false)

  const repo = ServiceLocator.draft.repository

  onMounted(async () => {
    drafts.value = await repo.getAll()
  })

  async function onSave(draft: Draft) {
    const idx = drafts.value.findIndex(item => item.uid === draft.uid)

    if (idx === -1) {
      drafts.value.push(draft)
    } else {
      drafts.value[idx] = draft
    }

    await repo.save(draft)
  }

  async function onDelete(uid: string) {
    const idx = drafts.value.findIndex(item => item.uid === uid)

    if (idx !== -1) {
      drafts.value.splice(idx, 1)
    }

    try {
      await repo.delete(uid)
    } catch (error) {
      console.log("Failed to delete draft: ", error)
    }
  }

  async function onDrop() {
    drafts.value.splice(0, drafts.value.length)
    await repo.drop()
  }

  return {
    drafts,
    onSave,
    onDelete,
    onDrop,
    showSaveDialog,
  }
}
