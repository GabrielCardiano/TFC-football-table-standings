import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams } from './mocks/Teams.mock';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint TEAMS', () => {

  beforeEach(function () {
    sinon.restore();
  })

  it('Retorna todos os times - status 200', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(allTeams);
  });
});
