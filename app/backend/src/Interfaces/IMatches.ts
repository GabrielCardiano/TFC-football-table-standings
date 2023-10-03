export interface IMatches {
  id: number
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type updateMessage = { message: 'Finished' };

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByQuery(query: boolean): Promise<IMatches[]>,
  updateMatch(id: number): Promise<updateMessage>
}
