
export enum DraftType {
  StartWork = 'StartWork',
  EndWork = 'EndWork',
  StartLunch = 'StartLunch',
  EndLunch = 'EndLunch'
}

export interface Draft {
  uid: string
  timestamp: Date
  type: DraftType
}
