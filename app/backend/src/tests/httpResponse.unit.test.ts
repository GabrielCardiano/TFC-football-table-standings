import * as sinon from 'sinon';
import * as chai from 'chai';
import httpResponse from '../utils/httpResponse';

const { expect } = chai;

describe('Teste função httpResponse', () => {

  beforeEach(function () {
    sinon.restore();
  })

  it('Recebe "SUCCESSFUL" e retorna status - 200', async function () {
    const response = httpResponse('SUCCESSFUL');
    expect(response).to.be.equal(200)
  });

  it('Recebe "INVALID_DATA" e retorna status - 400', async function () {
    const response = httpResponse('INVALID_DATA');
    expect(response).to.be.equal(400);
  });

  it('Recebe "NOT_FOUND" e retorna status - 404', async function () {
    const response = httpResponse('NOT_FOUND');
    expect(response).to.be.equal(404);
  });

  it('Recebe "CONFLICT" e retorna status - 409', async function () {
    const response = httpResponse('CONFLICT');
    expect(response).to.be.equal(409);
  });

  it('Recebe nenhum parâmetro e retorna status - 500', async function () {
    const response = httpResponse('');
    expect(response).to.be.equal(500);
  });  
});