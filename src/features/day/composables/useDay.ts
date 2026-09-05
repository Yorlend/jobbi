import { Day, DayStatus } from "@/features/day/models/day.ts";
import { ServiceLocator } from "@/providers/dependencies";
import { computed, onMounted, reactive, ref } from "vue";


export function useDay() {
  const day = reactive(new Day())
  const error = ref(false)

  const dayRepo = ServiceLocator.day.repository

  onMounted(async () => {
    const dbDay = await dayRepo.getByDate(day.date)

    if (dbDay !== undefined)
      Object.assign(day, dbDay)
  })

  const date = computed(() => {
    return day.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  const statusHeader = computed(() => {
    switch (day.status) {
      case DayStatus.Work:
        return { label: 'Working', icon: 'mdi-progress-clock' }
      case DayStatus.Lunch:
        return { label: 'Lunch', icon: 'mdi-food-turkey' }
      case DayStatus.Vacation:
        return { label: 'Vacation', icon: 'mdi-beach' }
      case DayStatus.Sick:
        return { label: 'Sick', icon: 'mdi-medical-bag' }
      default:
        return null
    }
  })

  async function onSave() {
    if (day.isValid())
      await dayRepo.save(day)
    else
      error.value = true
  }

  async function onReset() {
    await dayRepo.delete(day.date)
    day.reset()
  }

  return {
    day,
    date,
    statusHeader,
    error,
    onSave,
    onReset,
  }
}
