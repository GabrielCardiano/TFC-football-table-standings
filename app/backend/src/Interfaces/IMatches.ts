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
  finishMatch(id: number): Promise<updateMessage>
}
