import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';
import authentication from '../../setup/authentication'
import { product } from './query'
// import { isType } from 'graphql'

describe('product querys and mutations', () => {
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
      id: 1083,
      name: "testAdmin123",
      email: "test2@gmail.com",
      password: bcrypt.hashSync('abc123', 10),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      styleSummary: "coding cowboy"
    };

    const productData1 = {
      id: 1, 
      name: "shirt1234", 
      slug: "shirt1234", 
      description: "a shirt", 
      type: 1, 
      gender: 1, 
      image: "image"
    }; 

    await models.User.create(userData1);
    await models.Product.create(productData1);

    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "test1@example.com", password: "abc123") { token }}` })
      .expect(200)

    // token = response.body.data.userLogin.token
  })

  afterEach(async () => {
    // await models.Crate.destroy({ where: {} })
    await models.User.destroy({ where: {} })
    await models.Product.destroy({ where: {} })
  })

  afterAll(() => {
    db.close()
  })

  it('returns all products', async () => {
    const allProducts = `query {
      products {
        name
        slug
        
      }
    }`
    const response = await request(server)
    .get('/')
    .send({ query: allProducts })
    .expect(200)
    // console.log(response.body.data.products.length)
    expect(response.body.data.products.length).toEqual(1)
  });

  it('returns product by id', async () => {
    const productById = `query {
      product(id: 1) {
        name
      }
    }`

    const response = await request(server) 
    .get('/')
    .send({query: productById})
    .expect(200)
    expect(response.body.data.products.name).toEqual("shirt1234")
  });


});