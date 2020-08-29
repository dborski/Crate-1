import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt'
import db from '../../setup/database';
import authentication from '../../setup/authentication'
import { product, productTypes } from './query'
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
    
    const productData2 = {
      id: 2, 
      name: "pants1234", 
      slug: "pants1234", 
      description: "a pair of pants", 
      type: 1, 
      gender: 1, 
      image: "image"
    }; 
    const productData3 = {
      id: 3, 
      name: "dress", 
      slug: "dress", 
      description: "a dress", 
      type: 2, 
      gender: 2, 
      image: "image"
    }; 

    await models.User.create(userData1);
    await models.Product.create(productData1);
    await models.Product.create(productData2);
    await models.Product.create(productData3);

    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "test2@gmail.com", password: "abc123") { token }}` })
      .expect(200)

    token = response.body.data.userLogin.token
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
    expect(response.body.data.products.length).toEqual(3)
  });

  it('returns product by slug', async () => {
    const productBySlug = `query {
      product(slug: "shirt1234") {
        name
      }
    }`

    const response = await request(server) 
    .get('/')
    .send({query: productBySlug})
    .expect(200)
    expect(response.body.data.product.name).toEqual("shirt1234")
  });

  it('returns product by id', async () => {
    const product = `query {
      productById(productId: 1) {
        name
      }
    }`

    const response = await request(server)
    .get('/')
    .send({query: product})
    .expect(200)
    expect(response.body.data.productById.name).toEqual("shirt1234")
  });


  it('returns all products by type', async () => {
    const productByType = `query {
      productTypes(productType: 1) {
        name
      }
    }`

    const response = await request(server)
    .get('/')
    .send({query: productByType})
    .expect(200)
    
    expect(response.body.data.productTypes.length).toEqual(2)
  })

});