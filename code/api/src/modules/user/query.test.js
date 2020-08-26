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

    expect(response.body.data.users.length).toEqual(2)
  })

  it ('returns user by id', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 2) { email name } }'})
      .expect(200)

    expect(response.body.data.user.name).toEqual('The User')
  })

  it ('updates user style preference', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 2) { email name stylePreference } }' })
    
    var userResponse = response.body.data.user
  
    const responseStyle = await request(server)
      .post('/')
      .send({ query: 'mutation{ userUpdate(id: 2, stylePreference: "coding cowboy") {stylePreference} }'})
    console.log("response.body------->", responseStyle.body)
      .expect(200)
    var updatedUserResponse = responseStyle.body.data.user
    expect(updatedUserResponse.stylePreference).toEqual("coding cowboy")
  })
})