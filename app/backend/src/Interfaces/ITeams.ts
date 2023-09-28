export interface ITeams {
  id: number,
  teamName: string,
}

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>
}
