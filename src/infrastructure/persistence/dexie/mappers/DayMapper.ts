import { Day, DayStatus, TimeRange } from "@/features/day/models/day";
import { dateFromKey, DayEntityType, DayStatusEntity, toDateKey, type DayEntity, type TimeRangeEntity } from "../entities/DayEntity";

const TimeRangeMapper = {
  toModel(range: TimeRangeEntity): TimeRange {
    return new TimeRange(range.start, range.end)
  },

  fromModel(range: TimeRange): TimeRangeEntity {
    return {
      start: range.start,
      end: range.end,
    }
  }
}

export const DayMapper = {
  toModel(day: DayEntity): Day {
    return new Day(
      dateFromKey(day.date),
      TimeRangeMapper.toModel(day.workingHours),
      TimeRangeMapper.toModel(day.lunchHours),
      day.status as unknown as DayStatus,
    )
  },

  fromModel(day: Day, type: DayEntityType = DayEntityType.Plain): DayEntity {
    return {
      date: toDateKey(day.date),
      workingHours: TimeRangeMapper.fromModel(day.workingHours),
      lunchHours: TimeRangeMapper.fromModel(day.lunchHours),
      status: day.status as unknown as DayStatusEntity,
      type: type,
    }
  }
}
