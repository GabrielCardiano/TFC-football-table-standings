import MatchesModel from '../models/MatchesModel';
import { IMatches, IMatchesModel } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class MatchesService {
  private _matchesModel: IMatchesModel;

  constructor() {
    this._matchesModel = new MatchesModel();
  }

  public async findaAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this._matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findMatchesByQuery(query: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this._matchesModel.findByQuery(query);
    return { status: 'SUCCESSFUL', data: matches };
  }
}

export default MatchesService;
