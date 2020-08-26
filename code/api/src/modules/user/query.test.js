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

  it ('returns user by id', async () => {
    const singleUserQuery = `query { 
      user(id: 2) { 
        email 
        name } 
    }`

    const response = await request(server)
      .get('/')
      .send({ query: singleUserQuery})
      .expect(200)

    expect(response.body.data.user.name).toEqual('The User')
  })

  it ('returns all users', async () => {
    const allUsersQuery = `query { 
      users {
        email
        name
      }
    }`

    const response = await request(server)
      .get('/')
      .send({ query: allUsersQuery})
      .expect(200)

    expect(response.body.data.users.length).toEqual(3)
  })


  it ('updates user style preference', async () => {
    const updateUserQuery = `mutation {
      userUpdate(id:2, stylePreference: 'coding cowboy') {
      id
      name
      email
      stylePreference
      }
    }`

    const responseStyle = await request(server)
      .post('/')
      .send({ query: updateUserQuery })
      .expect(200)
      
    expect(responseStyle.body.data.userUpdate.stylePreference).toEqual("coding cowboy")
  })
})