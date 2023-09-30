import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/Teams.mock';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint TEAMS', function () {

  beforeEach(function () {
    sinon.restore();
  })

  it('Retorna todos os times - status 200', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(allTeams);
  });

  it('Retorna um time quando é feita uma busca por id - status 200', async function () {
    sinon.stub(TeamsModel, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/:id');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(team);
  })

  it('Retorna erro quando não encontra um time por id - status 404', async function() {
    sinon.stub(TeamsModel, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/:id');

    expect(status).to.equal(404);
    expect(body).to.be.deep.equal({ message: 'Team not found!' });
  })
});
