import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { DraftType, validateDrafts, type Draft } from '../../draft/models/draft'
import { ServiceLocator } from '@/providers/dependencies'
import { getDurationInMinutes, getDurationStrFromMinutes } from '@/util/time'

export function useDrafts() {
  const drafts = ref<Draft[]>([])
  const showSaveDialog = ref(false)
  const commitError = reactive({
    status: false,
    message: ''
  })

  const minuteTick = ref(0)
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    timer = setInterval(() => {
      minuteTick.value++
    }, 60_000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  const repo = ServiceLocator.draft.repository

  onMounted(async () => {
    drafts.value = await repo.getAll()
  })

  async function onSave(draft: Draft) {
    const idx = drafts.value.findIndex((item) => item.uid === draft.uid)

    if (idx === -1) {
      drafts.value.push(draft)
    } else {
      drafts.value[idx] = draft
    }

    await repo.save(draft)
  }

  async function onDelete(uid: string) {
    const idx = drafts.value.findIndex((item) => item.uid === uid)

    if (idx !== -1) {
      drafts.value.splice(idx, 1)
    }

    try {
      await repo.delete(uid)
    } catch (error) {
      console.log('Failed to delete draft: ', error)
    }
  }

  async function onDrop() {
    drafts.value.splice(0, drafts.value.length)
    await repo.drop()
  }

  function getDayDuration(): string {
    minuteTick.value

    let minutes = 0
    drafts.value.forEach((draft) => {
      const draftDur = getDurationInMinutes(draft.start_time, draft.end_time)
      if (draft.type == DraftType.Work) {
        minutes += draftDur
      } else {
        minutes -= draftDur
      }
    })
    return getDurationStrFromMinutes(minutes)
  }

  async function onDayCommit() {
    const status = validateDrafts(drafts.value)

    console.log(status)

    if (status.valid) {
      /* Commit through DayRepository */
    } else {
      commitError.status = !status.valid
      commitError.message = status.message ?? 'Unknown Error'
    }
  }

  return {
    drafts,
    onSave,
    onDelete,
    onDrop,
    showSaveDialog,
    getDayDuration,
    commitError,
    onDayCommit,
  }
}
