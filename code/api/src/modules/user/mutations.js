// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  // When creating a user, we need at least these three attributes. The one that is missing is role, 
  // which is most likely manually manipulated for creating an admin user
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// ANNOTATION: A general outline of the mutations file is that it is a collection of all the queries that change data such as create, update, destroy.
// The actual code for the database queries live in the resolvers.js file, but this file appears to act as a middleman between our frontend and those queries
// and directs the requests to the proper function in resolvers. Maybe could look at this file like a controller in rails 