import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'

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
        name 
      } 
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

    expect(response.body.data.users.length).toEqual(4)
  })

  it ('updates user style preference', async () => {
    const updateUserQuery = `mutation {
      userUpdate(id:2, stylePreference: "coding cowboy") {
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

  it ('deletes a user', async() => {
    const userData = {
      // id: 999,
      name: 'Test User',
      email: 'testuser@email.com',
      stylePreference: 'style',
      password: bcrypt.hashSync('123456', 12),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await models.User.create(userData)

    const deleteUserQuery = `mutation {
      userRemove(id:20) {
        id
        name
      }
    }`

    const response = await request(server)
      .post('/')
      .send({ query: deleteUserQuery })
      .expect(200)

    expect(response.body.data.userRemove.id).toEqual(null)
  })
})