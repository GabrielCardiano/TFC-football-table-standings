import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardService';
import httpResponse from '../utils/httpResponse';
import { IPath } from '../Interfaces/ILeaderboard';

class LeaderboardController {
  constructor(
    private _leaderboardServices = new LeaderboardServices(),
  ) { }

  async getTeamsLeaderboard(req: Request, res: Response) {
    const path = req.path.substring(1) as IPath;
    // console.log('path>>>', path);
    const { status, data } = await this._leaderboardServices.getTeamsLeaderboard(path);
    return res.status(httpResponse(status)).json(data);
  }
}

export default LeaderboardController;
