import teamsModel from '../database/models/TeamsModel';
import { ITeams, ITeamsModel } from '../Interfaces/ITeams';

class TeamsModel implements ITeamsModel {
  private model = teamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}

export default TeamsModel;
