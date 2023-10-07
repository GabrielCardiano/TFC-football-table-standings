import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/Teams.mock';
import MatchesModel from '../database/models/MatchModel';
import { createMatch, allMatches, bodyRequest, bodyRequestSameIds, bodyRequestIdNUll, matchTrue, matchFalse } from './mocks/Matches.mock';
import { authUser } from './mocks/Users.mock';
import JWT from '../utils/generateJWT';
import { verify } from 'crypto';
import TeamsModel from '../models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint MATCHES', function () {

  beforeEach(function () {
    sinon.restore();
  })
  // <-------- Timeout ----------> testar builda ou bulkbuild
  it('Retorna todos as partidas - status 200', async function () {
    const dbBuild = MatchesModel.bulkBuild(allMatches);
    sinon.stub(MatchesModel, 'findAll').resolves(dbBuild);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  });

  it('Retorna uma partida quando é feita uma busca por query-TRUE - status 200', async function () {
    sinon.stub(MatchesModel, 'findByPk').resolves(matchTrue as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matchTrue);
  });

  it('Retorna uma partida quando é feita uma busca por query-FALSE - status 200', async function () {
    sinon.stub(MatchesModel, 'findByPk').resolves(matchFalse as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matchFalse);
  });

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

  it('Cadastra nova partida em andamento e retorna os dados da partida - status 201', async function () {
    const dbBuild = MatchesModel.build(createMatch);
    sinon.stub(JWT, 'verify').resolves(authUser);
    sinon.stub(MatchesModel, 'create').resolves(dbBuild);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', 'token')
      .send(bodyRequest);

    expect(status).to.equal(201);
    expect(body).to.be.deep.equal(createMatch);
  })

  it('Não permite cadastrar partida com times iguais - status 422', async function () {
    sinon.stub(JWT, 'verify').resolves(authUser);
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', 'token')
      .send(bodyRequestSameIds);

    expect(status).to.equal(422);
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })

  it('Não permite cadastrar partida com times que não existem no banco de dados - status 404', async function () {
    const teamModel = new TeamsModel();
    sinon.stub(JWT, 'verify').resolves(authUser);
    sinon.stub(teamModel, 'findById').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', 'token')
      .send(bodyRequestIdNUll);

    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
  })

  it
})