import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardService';
import httpResponse from '../utils/httpResponse';

class LeaderboardController {
  constructor(
    private _leaderboardServices = new LeaderboardServices(),
  ) { }

  async getHomeTeamsLeaderboard(req: Request, res: Response) {
    const { status, data } = await this._leaderboardServices.getHomeTeamsLeaderboard();
    return res.status(httpResponse(status)).json(data);
  }
}

export default LeaderboardController;
