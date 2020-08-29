import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';
import authentication from '../../setup/authentication'

describe('user queries', () => {
  let server;

  beforeAll(async() => {
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
    await models.User.destroy({ where: {} })
  })

  beforeEach(async () => {
    const userData1 = {
      id: 3,
      name: "testUser1",
      email: "test1@example.com",
      password: bcrypt.hashSync('abc123', 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      stylePreference: "coding cowboy"
    };

    const userData2 = {
      id: 4,
      name: "testUser2",
      email: "test2@example.com",
      password: bcrypt.hashSync('123abc', 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      stylePreference: "goth farmer"
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
      user(id: 3) { 
        email 
        name 
      } 
    }`

    const response = await request(server)
      .get('/')
      .send({ query: singleUserQuery})
      .expect(200)

    expect(response.body.data.user.name).toEqual('testUser1')
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
      userUpdate(id:3, stylePreference: "coding cowboy") {
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

    expect(response.body.data.userRemove).toEqual(expect.anything())
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

  it ('logs in a user', async() => {
    const loginQuery = `query { 
      userLogin(email: "test1@example.com", password: "abc123") { 
        token 
      }
    }`
    const response = await request(server)
      .get('/')
      .send({ query: loginQuery })
      .expect(200)

    expect(response.body.data.userLogin.token).toEqual(expect.anything())
  })

  it ('gets user genders', async() => {
    const getGenderQuery = `query { 
      userGenders { 
        id
        name
      }
    }`
    const response = await request(server)
      .get('/')
      .send({ query: getGenderQuery })
      .expect(200)

    expect(response.body.data.userGenders[0].name).toEqual("Male")
  })
})