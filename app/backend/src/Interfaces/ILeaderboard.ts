export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

// export interface ILeaderboardModel {
//   getTeamsStandings(): Promise<ILeaderboard[]>,
//   calculateTotalPoints(victories: number, draws: number): number,
//   calculateGoalDifference(goalFor: number, goalsAgainst: number): number,
//   calculateOverAllEfficency(): number,
// }
