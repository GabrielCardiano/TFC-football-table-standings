import { ITeamsModel } from '../Interfaces/ITeams';
// import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/IMatches';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import LeaderboardStandings from '../utils/LeaderboardStandings';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

class LeaderboardService {
  private _teamsModel: ITeamsModel;
  private _matchModel: IMatchesModel;

  constructor() {
    this._teamsModel = new TeamsModel();
    this._matchModel = new MatchesModel();
  }

  async getHomeTeamsLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this._teamsModel.findAll();
    const allMatches = await this._matchModel.findByQuery(false);
    const teamsResults = allTeams.map((team) => new LeaderboardStandings(team, allMatches));
    return { status: 'SUCCESSFUL', data: teamsResults };
  }
}

export default LeaderboardService;
