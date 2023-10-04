import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/Teams.mock';
import MatchesModel from '../database/models/MatchModel';
import { allMatches } from './mocks/Matches.mock';
import { authUser } from './mocks/Users.mock';
import JWT from '../utils/generateJWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint MATCHES', function () {

  beforeEach(function () {
    sinon.restore();
  })
  // <-------- Timeout ----------> testar builda ou bulkbuild
  // it('Retorna todos as partidas - status 200', async function () {
  //   sinon.stub(MatchesModel, 'findAll').resolves(allMatches as any);
  //   const { status, body } = await chai.request(app).get('/matches');

  //   expect(status).to.equal(200);
  //   expect(body).to.be.deep.equal(allMatches);
  // });

  it('Updtade matches e retorna  uma mensagem de partida finalizada - status 200', async function () {
    const dbData = 1;
    const id = 1
    sinon.stub(JWT, 'verify').returns(authUser);
    sinon.stub(MatchesModel, 'update').resolves([dbData]);
    const { status, body } = await chai.request(app).patch(`/matches/${id}/finish`).set('Authorization', 'token');
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Updtade matches e retorna  uma mensagem de partida placar atualizado - status 200', async function () {
    const dbData = 1;
    const id = 1
    sinon.stub(JWT, 'verify').returns(authUser);
    sinon.stub(MatchesModel, 'update').resolves([dbData]);
    const { status, body } = await chai.request(app).patch(`/matches/${id}`).set('Authorization', 'token');
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ message: 'Score updated' });
  })
})