import teamsModel from '../database/models/TeamsModel';
import { ITeams, ITeamsModel } from '../Interfaces/ITeams';

class TeamsModel implements ITeamsModel {
  private model = teamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}

export default TeamsModel;
