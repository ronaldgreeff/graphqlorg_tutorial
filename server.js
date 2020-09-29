var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// If you're inserting into or altering data of a database, use Mutation
var schema = buildSchema(`
  type Mutation {
    setMessage(message: String): String
  }
  type Query {
    getMessage: String
  }
`);

var fakeDatabase = {};
// useful to return the message after it's set
var root = {
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: () => {
    return fakeDatabase.message;
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
