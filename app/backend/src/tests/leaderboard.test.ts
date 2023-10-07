import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/Teams.mock';
import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamsModel';
import { createMatch, allMatches, bodyRequest, bodyRequestSameIds, bodyRequestIdNUll, allFinishedMatches } from './mocks/Matches.mock';
import { authUser } from './mocks/Users.mock';
import JWT from '../utils/generateJWT';
import { verify } from 'crypto';
import { leaderboardTeams } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint LEADERBOARD', function () {

  beforeEach(function () {
    sinon.restore();
  })

  it('Retorna resultados de todos os times com partidas finalizadas - status 200', async function () {
    const dbDataTeams = TeamsModel.bulkBuild(allTeams);
    const dbDataMatches = MatchesModel.bulkBuild(allFinishedMatches);

    sinon.stub(TeamsModel, 'findAll').resolves(dbDataTeams)
    sinon.stub(MatchesModel, 'findAll').resolves(dbDataMatches);
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardTeams);
  });

  // it('', async function () { });

  // it('', async function () { });
})