import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';
import authentication from '../../setup/authentication'

describe('crate mutations', () => {
  let server;
  let token;
  beforeAll(async () => {
    server = express();

    server.use(
      authentication
    )

    server.use(
      '/',
      graphqlHTTP(request => ({
        schema: schema,
        graphiql: false,
        context: {
          auth: {
            user: request.user,
            isAuthenticated: request.user && request.user.id > 0
          }
        } 
      }),)
    );
  })

  beforeEach(async () => {
    const userData1 = {
      id: 1,
      name: "testAdmin1",
      email: "test1@example.com",
      password: bcrypt.hashSync('abc123', 10),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      styleSummary: "coding cowboy"
    };

    await models.User.create(userData1);

    const response = await request(server)
    .get('/')
    .send({ query: `{ userLogin(email: "test1@example.com", password: "abc123") { token }}`})
    .expect(200)

    token = response.body.data.userLogin.token
  })

  afterEach(async () => {
    await models.Crate.destroy({ where: {} })
    await models.User.destroy({ where: {} })
  })

  afterAll(() => {
    db.close()
  })

  it('creates a crate', async () => {
    const createCrateQuery = `mutation { 
      crateCreate(name: "mens shirts", description: "cool shirts") { 
        id
        name
        description
      } 
    }`

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: createCrateQuery })
      .expect(200)

    expect(response.body.data.crateCreate.name).toEqual('mens shirts')
  })
})