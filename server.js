var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// To handle GraphQl queries, define SCHEMA that defines
// the Query type - note that use of back quotes: (`` not '')
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// We also need an API root with a RESOLVER function
// per API endpoint
var root = {
  hello: () => {
    return 'Hello world';
  },
};

// API Server. graphiql: true enables GraphiQL interactive interface
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

// { hello } will return you { data: { hello: 'Hello world!' } }
