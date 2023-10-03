import TeamsModel from '../database/models/TeamsModel';
import matchModel from '../database/models/MatchModel';
import { IMatches, IMatchesModel, updateMessage } from '../Interfaces/IMatches';

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

  public async findByQuery(query: boolean): Promise<IMatches[]> {
    const matchesDbArray = await this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matches = matchesDbArray.map((match) => match.toJSON());
    return matches;
  }

  public async finishMatch(id: number): Promise<updateMessage> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}

export default MatchesModel;
