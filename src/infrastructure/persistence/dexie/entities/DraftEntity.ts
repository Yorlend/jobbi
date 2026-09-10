
export enum DraftTypeEntity {
  StartWork = 'StartWork',
  EndWork = 'EndWork',
  StartLunch = 'StartLunch',
  EndLunch = 'EndLunch'
}

export interface DraftEntity {
  uid: string,
  timestamp: number,
  type: DraftTypeEntity
}
