import { ITeamsModel } from '../Interfaces/ITeams';
import { ILeaderboard, IPath } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/IMatches';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import LeaderboardStandings from '../utils/LeaderboardStandings';

class LeaderboardService {
  private _teamsModel: ITeamsModel;
  private _matchModel: IMatchesModel;

  constructor() {
    this._teamsModel = new TeamsModel();
    this._matchModel = new MatchesModel();
  }

  async getTeamsLeaderboard(path: IPath): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this._teamsModel.findAll();
    const allMatches = await this._matchModel.findByQuery(false);
    const teamsResults = allTeams
      .map((team) => new LeaderboardStandings(team, allMatches, path))
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        if (b.totalVictories !== a.totalVictories) {
          return b.totalVictories - a.totalVictories;
        }
        if (b.goalsBalance !== a.goalsBalance) {
          return b.goalsBalance - a.goalsBalance;
        }
        return b.goalsFavor - a.goalsFavor;
      });

    return { status: 'SUCCESSFUL', data: teamsResults };
  }
}

export default LeaderboardService;
