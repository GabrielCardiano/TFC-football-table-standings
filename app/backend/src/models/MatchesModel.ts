import TeamsModel from '../database/models/TeamsModel';
import matchModel from '../database/models/MatchModel';
import { IMatches, IMatchesModel } from '../Interfaces/IMatches';

class MatchesModel implements IMatchesModel {
  private model = matchModel;

  public async findAll(): Promise<IMatches[]> {
    const allMatchesDBArray = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const allMatches = allMatchesDBArray.map((match) => match.toJSON());
    return allMatches;
  }
}

export default MatchesModel;
