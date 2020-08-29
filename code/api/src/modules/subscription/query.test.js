import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';
import authentication from '../../setup/authentication'

describe('subscription queries', () => {
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
      }))
    );
  })

  beforeEach(async () => {
    const userData1 = {
      id: 6,
      name: "testAdmin2",
      email: "test5@example.com",
      password: bcrypt.hashSync('abc123', 10),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      stylePreference: "coding cowboy"
    };

    await models.User.create(userData1);
    console.log(await models.User.findAll({ where: {} }))
    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "test2@example.com", password: "abc123") { token }}` })
      .expect(200)
    console.log(response.body.data)
    token = response.body.data.userLogin.token

    const crateData1 = {
      name: "crate",
      description: "this is a crate"
    };

    await models.Crate.create(crateData1);
    console.log(await models.Crate.findAll({ where: {} }))
  })

  afterEach(async () => {
    await models.Crate.destroy({ where: {} })
    await models.User.destroy({ where: {} })
  })

  afterAll(() => {
    db.close()
  })

  xit('returns all subscriptions', async () => {
    const allSubscriptionsQuery = `query {
      subscriptions {
        crateId
        userId
      }
    }`

    const response = await request(server)
      .get('/')
      .send({ query: allSubscriptionsQuery })
      .expect(200)

    expect(response.body.data.subscriptions.length).toEqual(1)

  })
})