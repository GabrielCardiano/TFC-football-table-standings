import { IMatches } from '../Interfaces/IMatches';
import { ITeams } from '../Interfaces/ITeams';

// // REGRAS DE NEGOCIO:
// // - `Classificação`: Posição na classificação;
// // name: string, - `Time`: Nome do time;
// // totalPoints: number, - `P`: Total de Pontos;
// // totalGames: number, - `J`: Total de Jogos;
// // totalVictories: number, - `V`: Total de Vitórias;
// // totalDraws: number, - `E`: Total de Empates;
// // totalLosses: number, - `D`: Total de Derrotas;
// // goalsFavor: number, - `GP`: Gols marcados a favor;
// // goalsOwn: number, - `GC`: Gols sofridos;
// // goalsBalance: number, - `SG`: Saldo total de gols;
// // efficiency: number, - `%`: Aproveitamento do time.

class LeaderboardStandings {
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  constructor(
    team: ITeams,
    matches: IMatches[],
  ) {
    this.name = team.teamName;
    this.totalGames = this.calculateTotalGames(team, matches);
    this.totalVictories = this.calculateAllTeamsVictory(team, matches);
    this.totalDraws = this.calculateAllTeamsDraws(team, matches);
    this.totalLosses = this.calculateAllTeamsLosses(team, matches);
    this.goalsFavor = this.calculateGoalsFavor(team, matches);
    this.goalsOwn = this.calculateGoalsOwn(team, matches);
    this.totalPoints = this.calculateTotalPoints();
    this.goalsBalance = this.calculateGoalsDifference();
    this.efficiency = this.calculateOverAllEfficency();
  }

  public calculateTotalPoints(): number {
    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
    return this.totalPoints;
  }

  public calculateGoalsDifference(): number {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    return this.goalsBalance;
  }

  public calculateOverAllEfficency(): number {
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    return this.efficiency;
  }

  public calculateTotalGames(team: ITeams, matchesArr: IMatches[]): number {
    const totalgames = matchesArr.filter((matches) => matches.homeTeamId === team.id);
    this.totalGames = totalgames.length;
    return this.totalGames;
  }

  public calculateAllTeamsVictory(team: ITeams, matchesArr: IMatches[]): number {
    const victories = matchesArr.filter((m) => m.homeTeamGoals > m.awayTeamGoals);
    this.totalVictories = victories.length;
    return this.totalVictories;
  }

  public calculateAllTeamsDraws(team: ITeams, matchesArr: IMatches[]): number {
    const draws = matchesArr.filter((m) => m.homeTeamGoals === m.awayTeamGoals);
    this.totalDraws = draws.length;
    return this.totalDraws;
  }

  public calculateAllTeamsLosses(team: ITeams, matchesArr: IMatches[]): number {
    const losses = matchesArr.filter((m) => m.homeTeamGoals === m.awayTeamGoals);
    this.totalDraws = losses.length;
    return this.totalDraws;
  }

  public calculateGoalsFavor(team: ITeams, matchesArr: IMatches[]): number {
    const totalGames = matchesArr.filter((matches) => matches.homeTeamId === team.id);
    this.goalsFavor = totalGames.reduce((count, m) => count + m.homeTeamGoals, 0);
    return this.goalsFavor;
  }

  public calculateGoalsOwn(team: ITeams, matchesArr: IMatches[]) {
    const totalGames = matchesArr.filter((matches) => matches.homeTeamId === team.id);
    this.goalsOwn = totalGames.reduce((count, m) => count + m.awayTeamGoals, 0);
    return this.goalsOwn;
  }
}

export default LeaderboardStandings;
