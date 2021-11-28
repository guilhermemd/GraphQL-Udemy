const graphql = require('graphql');

const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const  users = [
  { id: "23", firstName: 'John', age: 34 },
  { id: "24", firstName: 'Paul', age: 64 },
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt}
  }
});

// O RootQuery faz com que o GraphQL pule/vá para um especifico dado
// Se der os 'args' eu retorno oo 'UserType'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
