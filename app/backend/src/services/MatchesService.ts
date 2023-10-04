import MatchesModel from '../models/MatchesModel';
import {
  IMatches,
  IMatchesModel,
  updateFinishMessage,
  updateScoreMessage,
  updateScore,
  AddMatch,
} from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeams';
import TeamsModel from '../models/TeamsModel';

class MatchesService {
  private _matchesModel: IMatchesModel;
  private _teamsModel: ITeamsModel;

  constructor() {
    this._matchesModel = new MatchesModel();
    this._teamsModel = new TeamsModel();
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

  public async createMatch(body: AddMatch): Promise<ServiceResponse<IMatches>> {
    // verifica que são times diferente
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    // verifica se os times estão cadastrados no banco de dados
    const existHomeTeam = await this._teamsModel.findById(homeTeamId);
    const existAwayTeam = await this._teamsModel.findById(awayTeamId);
    if (!existHomeTeam || !existAwayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this._matchesModel.createMatch(body);
    return { status: 'CREATED', data: newMatch };
  }
}

export default MatchesService;
