const graphql = require('graphql');

const axios = require('axios');

// const _ = require('lodash'); lodash foi utilizado para um data estático

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// const  users = [
//   { id: "23", firstName: 'John', age: 34 },
//   { id: "24", firstName: 'Paul', age: 64 },
// ]

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // fields passou paa arrow function para que a função seja defina mas não executada, podendo pegar os valores de UserType
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString},
    users: { 
      type: new GraphQLList(UserType),
      resolve(parentValue, _args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((resp) => resp.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () =>  ({
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt},
    company: { 
      type: CompanyType,
      resolve(parentValue, _args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.users.id}`)
          .then((resp) => resp.data);
      }
    }
  })
});

// O RootQuery faz com que o GraphQL pule/vá para um especifico dado
// Se der os 'args' eu retorno oo 'UserType'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //aqui é o argumento da query, "user" pode ser "xablau"!!
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        // console.log(parentValue)
        // return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
          //colocar 'resp.data' pois o axios retorna um obj chamado data com as info requisitadas
      }
    },
    //nome do argumento query é company
    company: { 
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        // console.log(args) => retorna { id: "1"};
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt)},
        companyId: { type: GraphQLString}
      },
      resolve(_parentValue, { firstName, age }) {
        return axios.post('http://localhost:3000/users', { firstName, age })
          .then((resp) => resp.data); 
      }
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(_parentValue, args) {
        return axios.delete(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data); 
      }
    }
  }  
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
