import { Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
  ) { }

  public async findAllMatches(req: Request, res: Response) {
    const query = req.query.inProgress;

    if (query === 'true') {
      const { status, data } = await this._matchesService.findMatchesByQuery(true);
      return res.status(httpResponse(status)).json(data);
    }
    if (query === 'false') {
      const { status, data } = await this._matchesService.findMatchesByQuery(false);
      return res.status(httpResponse(status)).json(data);
    }

    const { status, data } = await this._matchesService.findaAllMatches();
    return res.status(httpResponse(status)).json(data);
  }

  public async updateFinishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this._matchesService.updateFinishMatch(id);
    return res.status(httpResponse(status)).json(data);
  }
}

export default MatchesController;
