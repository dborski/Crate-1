// const { isType } = require("graphql")

// import request from 'supertest'
// import express from 'express'
// import schema from '../../setup/schema'


// describe('user queries', () => {
//   let server;

//   beforeAll(() => {
//     server = express();

//     server.use(
//       '/',
//       graphqlHTTP({
//         schema: schema,
//         graphiql: false,
//       })
//     )
//   })

//   it('returns all users', async () => {
//     const response = await request(server)
//       .get('/')
//       .send({ query: '{ users { email name } }'}) //will match up with the query that were testing
//       .expect(200)
//       //can console log to see what the response is in terminal
//     expect(response.body.data.users.length).toEqual(2)
//   })

//   it('returns user by ID', async () => {
//     const response = await request(server)
//       .get('/')
//       .send({ query: '{ user(id: 2) { email name } }' }) //will match up with the query that were testing
//       .expect(200)
//     //can console log to see what the response is in terminal
//     expect(response.body.data.user.name).toEqual('The User')
//   })

//   it('is true', () => {
//     expect(true.toBe(true))
//   })
// })

// ANNOTATION: Here is a query test for getting all users. Followed along from the class lesson.