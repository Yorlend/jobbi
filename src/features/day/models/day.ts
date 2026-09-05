import { getCurrentTime } from '@/util/time'

export enum DayStatus {
  Undefined = 'undefined',
  Work = 'work',
  Lunch = 'lunch',
  End = 'end',
  Sick = 'sick',
  Vacation = 'vacation',
}

export class TimeRange {
  constructor(
    public start: string = '',
    public end: string = '',
  ) {}

  isValid(): boolean {
    return this.start !== '' && this.end !== '' && this.start < this.end
  }

  contains(range: TimeRange): boolean {
    return this.isValid() && range.isValid() && this.start <= range.start && this.end >= range.end
  }
}

export class Day {
  constructor(
    public date: Date = new Date(),
    public workingHours: TimeRange = new TimeRange(),
    public lunchHours: TimeRange = new TimeRange(),
    public status: DayStatus = DayStatus.Undefined,
  ) {}

  toggleWork(): void {
    switch (this.status) {
      case DayStatus.Undefined:
        if (this.workingHours.start === '') {
          this.workingHours.start = getCurrentTime()
          this.status = DayStatus.Work
        }
        break
      case DayStatus.Work:
        if (this.workingHours.end === '') {
          this.workingHours.end = getCurrentTime()
          this.status = DayStatus.End
        }
        break
      default:
        break
    }
  }

  toggleLunch(): void {
    switch (this.status) {
      case DayStatus.Work:
        if (this.lunchHours.start === '') {
          this.lunchHours.start = getCurrentTime()
          this.status = DayStatus.Lunch
        }
        break
      case DayStatus.Lunch:
        if (this.lunchHours.end === '') {
          this.lunchHours.end = getCurrentTime()
          this.status = DayStatus.Work
        }
        break
      default:
        break
    }
  }

  setSick(): void {
    this.reset()
    this.status = DayStatus.Sick
  }

  setVacation(): void {
    this.reset()
    this.status = DayStatus.Vacation
  }

  reset(): void {
    this.date = new Date()
    this.workingHours.start = ''
    this.workingHours.end = ''
    this.lunchHours.start = ''
    this.lunchHours.end = ''
    this.status = DayStatus.Undefined
  }

  isValid(): boolean {
    return (
      this.status == DayStatus.Vacation ||
      this.status == DayStatus.Sick ||
      (this.workingHours.isValid() &&
        (!this.lunchHours.isValid() || this.workingHours.contains(this.lunchHours)))
    )
  }
}
