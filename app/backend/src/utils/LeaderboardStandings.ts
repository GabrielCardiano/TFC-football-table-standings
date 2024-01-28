import { IPath } from '../Interfaces/ILeaderboard';
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
    path: IPath,
  ) {
    this.name = this.setName(team);
    this.totalGames = this.calculateTotalGames(team, matches);
    this.totalVictories = this.calculateAllTeamsVictory(team, matches, path);
    this.totalDraws = this.calculateAllTeamsDraws(team, matches, path);
    this.totalLosses = this.calculateAllTeamsLosses(team, matches, path);
    this.goalsFavor = this.calculateGoalsFavor(team, matches, path);
    this.goalsOwn = this.calculateGoalsOwn(team, matches, path);
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

  public setName(team: ITeams) {
    this.name = team.teamName;
    return this.name;
  }

  public calculateTotalGames(team: ITeams, matchesArr: IMatches[]): number {
    // console.log('totalgames>>>', path);
    const totalgames = matchesArr.filter((matches) => matches.homeTeamId === team.id);
    this.totalGames = totalgames.length;
    return this.totalGames;
  }

  public calculateAllTeamsVictory(team: ITeams, matchesArr: IMatches[], path: IPath): number {
    const allMatches = matchesArr.filter((matches) => matches[`${path}TeamId`] === team.id);
    const victories = allMatches.filter((m) => m[`${path}TeamGoals`] > m.awayTeamGoals);
    this.totalVictories = victories.length;
    return this.totalVictories;
  }

  public calculateAllTeamsDraws(team: ITeams, matchesArr: IMatches[], path: IPath): number {
    const allMatches = matchesArr.filter((matches) => matches[`${path}TeamId`] === team.id);
    const draws = allMatches.filter((m) => m.homeTeamGoals === m.awayTeamGoals);
    this.totalDraws = draws.length;
    return this.totalDraws;
  }

  public calculateAllTeamsLosses(team: ITeams, matchesArr: IMatches[], path: IPath): number {
    const allMatches = matchesArr.filter((matches) => matches[`${path}TeamId`] === team.id);
    const losses = allMatches.filter((m) => m.homeTeamGoals < m.awayTeamGoals);
    this.totalDraws = losses.length;

    return this.totalDraws;
  }

  public calculateGoalsFavor(team: ITeams, matchesArr: IMatches[], path: IPath): number {
    const totalGames = matchesArr.filter((matches) => matches[`${path}TeamId`] === team.id);
    this.goalsFavor = totalGames.reduce((count, m) => count + m[`${path}TeamGoals`], 0);
    return this.goalsFavor;
  }

  public calculateGoalsOwn(team: ITeams, matchesArr: IMatches[], path: IPath) {
    const totalGames = matchesArr.filter((matches) => matches[`${path}TeamId`] === team.id);
    if (path === 'home') {
      this.goalsOwn = totalGames.reduce((count, m) => count + m.awayTeamGoals, 0);
    } else if (path === 'away') {
      this.goalsOwn = totalGames.reduce((count, m) => count + m.homeTeamGoals, 0);
    }
    return this.goalsOwn;
  }
}

export default LeaderboardStandings;
