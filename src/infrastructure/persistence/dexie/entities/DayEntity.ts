export enum DayStatusEntity {
  Undefined = 'undefined',
  Work = 'work',
  Lunch = 'lunch',
  End = 'end',
  Sick = 'sick',
  Vacation = 'vacation',
}

// YYYY-MM-DD
export type DateKey = `${number}-${number}-${number}`

export interface TimeRangeEntity {
  start: string
  end: string
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function dateFromKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)

  if (!year || !month || !day)
    throw new Error('Invalid key: ${key}')

  return new Date(year, month - 1, day)
}

export interface DayEntity {
  date: string
  workingHours: TimeRangeEntity
  lunchHours: TimeRangeEntity
  status: DayStatusEntity
}
