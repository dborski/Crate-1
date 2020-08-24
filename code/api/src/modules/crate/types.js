// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// defines the attributes associated with the crate
// there does not seem to be a relation between crate and product. I could have missed it but we might have to create that.
// Crate type
const CrateType = new GraphQLObjectType({
  name: 'crate',
  description: 'Crate Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CrateType