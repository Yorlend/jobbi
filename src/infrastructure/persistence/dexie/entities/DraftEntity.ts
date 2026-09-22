
export enum DraftTypeEntity {
  StartWork = 'StartWork',
  EndWork = 'EndWork',
  StartLunch = 'StartLunch',
  EndLunch = 'EndLunch'
}

export interface DraftEntity {
  uid: string
  title: string
  start_ts: number | undefined
  end_ts: number | undefined
  type: DraftTypeEntity
}
