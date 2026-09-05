import { Day } from "@/features/day/models/day.ts";
import { computed, reactive } from "vue";


export function useDay() {
  const day = reactive(new Day())

  const date = computed(() => {
    return day.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  return {
    day,
    date,
  }
}
