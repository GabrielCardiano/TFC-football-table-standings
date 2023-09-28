import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import httpResponse from '../utils/httpResponse';

class TeamsController {
  constructor(
    private _teamsController = new TeamsService(),
  ) { }

  public async findAllTeams(_req: Request, res: Response) {
    const { status, data } = await this._teamsController.findAllTeams();
    res.status(httpResponse(status)).json(data);
  }

  public async findTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this._teamsController.findTeamById(id);
    res.status(httpResponse(status)).json(data);
  }
}

export default TeamsController;
