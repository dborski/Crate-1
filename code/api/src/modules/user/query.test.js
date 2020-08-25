import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'

describe('user queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
      }),
    )


  })

  it ('returns all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { email name } }'})
      .expect(200)

    expect(response.body.data.users.length).toEqual(3)
  })

  it ('returns user by id', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 2) { email name } }'})
      .expect(200)

    expect(response.body.data.user.name).toEqual('The User')
  })

  it ('updates user style preference', async () => {
    const user = [
      { id: 1, name: "test", email: "test", password: "pw", stylePreference: "test" }
      // { id: 2, url: "https://www.url2.dev" },
      // { id: 3, url: "https://www.link3.dev" }
    ];
    const response = await request(server)
      .get('/')
      .send({ query: 'mutation{ userUpdate(id: 1, stylePreference: "goth farmer") }'})
      console.log(response.body)
      .expect(200)

  })
})