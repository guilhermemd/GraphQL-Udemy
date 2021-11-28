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

// O RootQuery faz com que o GraphQL pule/vá para um especifico dado
// Se der os 'args' eu retorno oo 'UserType'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        
      }
    }
  }
})
