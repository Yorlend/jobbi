
export enum DraftType {
  Work = 'Work',
  Lunch = 'Lunch',
}

export interface Draft {
  uid: string
  title: string
  start_time: Date | undefined
  end_time: Date | undefined
  type: DraftType
}
