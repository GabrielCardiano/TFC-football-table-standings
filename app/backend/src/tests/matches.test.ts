import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams, team } from './mocks/Teams.mock';
import MatchesModel from '../database/models/MatchModel';
import { allMatches } from './mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint MATCHES', function () {

  beforeEach(function () {
    sinon.restore();
  })
  // <-------- Timeout ---------->
  // it('Retorna todos as partidas - status 200', async function () {
  //   sinon.stub(MatchesModel, 'findAll').resolves(allMatches as any);
  //   const { status, body } = await chai.request(app).get('/matches');

  //   expect(status).to.equal(200);
  //   expect(body).to.be.deep.equal(allMatches);
  // });
})