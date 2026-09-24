import { onMounted, onUnmounted, ref } from "vue";
import type { Draft } from "../models/draft";
import { getDuration } from "@/util/time";

export function useDraftTimer() {
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

  const getDraftDuration = (draft: Draft): string => {
    minuteTick.value

    return getDuration(draft.start_time, draft.end_time)
  }

  return { toggleTimer, canToggle, getDraftDuration }
}
