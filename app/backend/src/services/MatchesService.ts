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
}

export default MatchesService;
