import MatchesModel from '../models/MatchesModel';
import {
  IMatches,
  IMatchesModel,
  updateFinishMessage,
  updateScoreMessage,
  updateScore,
} from '../Interfaces/IMatches';
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

  public async updateFinishMatch(id: number): Promise<ServiceResponse<updateFinishMessage>> {
    const message = await this._matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: message };
  }

  public async updateMatchScore(id: number, body: updateScore)
    : Promise<ServiceResponse<updateScoreMessage>> {
    const message = await this._matchesModel.updateMatchScore(id, body);

    return { status: 'SUCCESSFUL', data: message };
  }
}

export default MatchesService;
