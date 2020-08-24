// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// theh product and its attriutes 
// Product type
const ProductType = new GraphQLObjectType({
  name: 'product',
  description: 'Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    // still not 100% sure what this is but it sounds like the route (talking aboug slug)
    slug: { type: GraphQLString },
    type: { type: GraphQLInt },
    // looks like we use an enum or something similar with this. Look at the male and female desc code/api/src/config/params.json
    gender: { type: GraphQLInt },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// User Gender type
const ProductTypesType = new GraphQLObjectType({
  name: 'productTypesType',
  description: 'User Types Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

export { ProductType, ProductTypesType }