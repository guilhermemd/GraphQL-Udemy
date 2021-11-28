const graphql = require('graphql');

const axios = require('axios');

// const _ = require('lodash'); lodash foi utilizado para um data estático

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

// const  users = [
//   { id: "23", firstName: 'John', age: 34 },
//   { id: "24", firstName: 'Paul', age: 64 },
// ]

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
        // return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
          //colocar 'resp.data' pois o axios retorna um obj chamado data com as info requisitadas
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
