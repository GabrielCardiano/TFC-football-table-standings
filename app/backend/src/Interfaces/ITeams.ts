export interface ITeams {
  id: number,
  teamName: string,
}

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  findById(id: number): Promise<ITeams | null>,
}
