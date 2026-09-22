export function getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function getDateFromTime(time: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)

  if (!match) {
    throw new Error(`Invalid time format: ${time}`)
  }

  const hours = Number(match[1])
  const minutes = Number(match[2])

  const date = new Date()

  date.setHours(hours, minutes, 0, 0)

  return date
}

export function getDuration(from: Date | undefined, to: Date | undefined): string {
  if (!from) return '00:00'

  if (!to) to = new Date()

  const minutes = Math.floor((to.getTime() - from.getTime()) / (60 * 1000))

  if (minutes < 0) {
    return '00:00'
  }

  const h = Math.floor(minutes / 60)
  const m = minutes % 60

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function dateToString(date: Date | undefined): string {
  return date
    ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    : '--:--'
}
