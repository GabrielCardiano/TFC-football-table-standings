import { Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
  ) { }

  public async findAllMatches(req: Request, res: Response) {
    const { status, data } = await this._matchesService.findaAllMatches();
    return res.status(httpResponse(status)).json(data);
  }
}

export default MatchesController;
