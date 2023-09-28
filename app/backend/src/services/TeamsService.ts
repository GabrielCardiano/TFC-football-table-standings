import TeamsModel from '../models/TeamsModel';
import { ITeams, ITeamsModel } from '../Interfaces/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamsService {
  private _teamsModel: ITeamsModel;

  constructor() {
    this._teamsModel = new TeamsModel();
  }

  public async findAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this._teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this._teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found!' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamsService;
