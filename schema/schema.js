const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql;

const UserType = GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt}
  }
});