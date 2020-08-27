import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';

describe('user queries', () => {
  let server;

  beforeAll(async() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
      }),
    );
    await models.User.destroy({ where: {} })
  })

  beforeEach(async () => {
    const userData1 = {
      id: 1,
      name: "testUser1",
      email: "test1@example.com",
      password: bcrypt.hashSync('abc123', 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      styleSummary: "coding cowboy"
    };

    const userData2 = {
      id: 2,
      name: "testUser2",
      email: "test2@example.com",
      password: bcrypt.hashSync('123abc', 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      styleSummary: "goth farmer"
    };

    await models.User.create(userData1);
    await models.User.create(userData2);
  })

  afterEach(async () => {
    await models.User.destroy({ where: {} })
  })

  afterAll(() => {
    db.close()
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

    expect(response.body.data.user.name).toEqual('testUser2')
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

    expect(response.body.data.users.length).toEqual(2)
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
    const deleteUserQuery = `mutation {
      userRemove(id:1) {
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

  it ('creates a user', async() => {
    const createUserQuery = `mutation {
      userSignup(name: "newUser", email: "newEmail@example.com", password: "testPassword") {
        id
        name
        email
      }
    }`

    const response = await request(server)
      .post('/')
      .send({ query: createUserQuery })
      .expect(200)

    expect(response.body.data.userSignup.name).toEqual("newUser")
    expect(response.body.data.userSignup.email).toEqual("newEmail@example.com")
  })

  it.skip ('logs in a user', async() => {
    const loginUserQuery = `query {
      userLogin(email: "test1@example.com", password: "abc123") {
        name
        email
        role
      },
        token 
    }`

    const response = await request(server)
      .post('/')
      .send({ query: loginUserQuery })
      .expect(200)

    expect(response.body.data.userLogin.email).toEqual("testUser1@example.com")
  })
})