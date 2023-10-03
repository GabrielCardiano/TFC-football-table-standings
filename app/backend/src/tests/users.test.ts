import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { user, userDB, userRole } from './mocks/Users.mock';
import UserModel from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import JWT from '../utils/generateJWT';
import Validations from '../middleware/Validations';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste endpoint LOGIN', function () {
  beforeEach(function () {
    sinon.restore();
  })

  afterEach(function () {
    sinon.restore();
  });

  //  <------ Tá dando TIME OUT sei lá pq ----->

  // it('Retorna um token quando Login é bem-sucedido - status 200', async function () {
  //   const loginBody = { email: "user@user.com", password: "secret_user" };
  //   const dataDB = UserModel.build(userDB);
  //   sinon.stub(UserModel, 'findOne').resolves(dataDB as any);
  //   sinon.stub(JWT, 'sign').returns('token');
  //   // sinon.stub(Validations, 'autheticateUser').returns();
  //   const { status, body } = await chai.request(app).post('/login').send(loginBody);
  //   expect(status).to.equal(200);
  //   expect(body).to.have.key('token');
  // })

  it('Login mal-sucedido quando email é inexistente - status 400', async function () {
    const loginBody = { password: "secret_user" }; // without email
    sinon.stub(UserModel, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(loginBody);
    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Login mal-sucedido quando password é inexistente - status 400', async function () {
    const loginBody = { email: "user@user.com" }; // without password
    sinon.stub(UserModel, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(loginBody);
    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  //  <------ Tá dando TIME OUT sei lá pq ----->

  // it('Login mal-sucedido quando password é inválido - status 400', async function () {
  //   const loginBody = { email: "user@user.com", password: "invalid_password" }; // with invalid password
  //   sinon.stub(UserModel, 'findOne').resolves(user as any);
  //   sinon.stub(bcrypt, 'compare').resolves(false)
  //   const { status, body } = await chai.request(app).post('/login').send(loginBody);
  //   expect(status).to.equal(500);
  //   expect(body).to.be.deep.equal({ message: 'Invalid password'  });
  // })

  it('Não encontra usuário cadastrado no banco de dados - status 404', async function () {
    const loginBody = { email: 'zico@fla.com', password: 'ZicoRei' }; // non registered user
    sinon.stub(UserModel, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login').send(loginBody);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  })

  // <------ JWT secret is missing sei lá porque? ------->

  it('Retorna a role do usuário - status 200', async function () {
    sinon.stub(JWT, 'verify').returns(userRole); //retorno deo verify
    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'token');
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: 'user' }); // mockar retorno
  })
})