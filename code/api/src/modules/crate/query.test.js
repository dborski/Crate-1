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
    await models.Crate.destroy({ where: {} })
    await models.User.destroy({ where: {} })
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
      stylePreference: "coding cowboy"
    };

    const crateData1 = {
      id: 1,
      name: "testCrate1",
      description: "testCrate1 Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const crateData2 = {
      id: 2,
      name: "testCrate2",
      description: "testCrate2 Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const crateData3 = {
      id: 3,
      name: "testCrate3",
      description: "testCrate3 Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await models.User.create(userData1);
    await models.Crate.create(crateData1);
    await models.Crate.create(crateData2);
    await models.Crate.create(crateData3);

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
  
  it('updates a crates name and description', async () => {
    const updateCrateQuery = `mutation { 
      crateUpdate(id: 2, name: "newTestCrate2", description: "New Description") {
        id
        name
        description
      } 
    }`

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: updateCrateQuery })
      .expect(200)

    expect(response.body.data.crateUpdate.name).toEqual("newTestCrate2")
    expect(response.body.data.crateUpdate.description).toEqual("New Description")
  })

  it('deletes a crate', async () => {
    const removeCrateQuery = `mutation { 
      crateRemove(id: 3) {
        id
      } 
    }`

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: removeCrateQuery })
      .expect(200)

    expect(response.body.data.crateRemove).toEqual(expect.anything())
  })

  it('gets single crate by ID', async () => {
    const getCrateQuery = `query { 
      crateById(crateId: 1) { 
        id
        name
        description
      } 
    }`

    const response = await request(server)
      .get('/')
      .send({ query: getCrateQuery })
      .expect(200)

    expect(response.body.data.crateById.name).toEqual('testCrate1')
  })

  it('gets all crates', async () => {
    const getAllCratesQuery = `query { 
      crates(orderBy: "asc") { 
        id
        name
        description
      } 
    }`

    const response = await request(server)
      .get('/')
      .send({ query: getAllCratesQuery })
      .expect(200)

    expect(response.body.data.crates.length).toEqual(3)
  })

})