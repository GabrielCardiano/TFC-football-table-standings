export interface IMatches {
  id: number
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type updateFinishMessage = { message: 'Finished' };

export type updateScoreMessage = { message: 'Score updated' };

export interface updateScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export type AddMatch = Omit<IMatches, 'id'>;

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByQuery(query: boolean): Promise<IMatches[]>,
  finishMatch(id: number): Promise<updateFinishMessage>,
  updateMatchScore(id: number, body: updateScore): Promise<updateScoreMessage>,
  createMatch(body: AddMatch): Promise<IMatches>,
}
