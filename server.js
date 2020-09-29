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

// querying { hello } will return you { data: { hello: 'Hello world!' } }


// GraphQL Clients
// *Relay is a powerful client that handles batching, caching and more*

// HTTP POST request to endpoint with query field in JSON payload
// curl -X POST
// -H "Content-Type: application/json"
// -d '{"query": "{ hello }"}' http://localhost:4000/graphql

// in Brower @ localhost:4000/graphql
// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({query: "{ hello }"})
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));



// When passing in arguments via browser, use $var syntax as below

// eg. schema
// `type Query {
//   rollDice(numDice: Int!, numSides: Int): [Int]
// }`
//
// Browser
// var dice = 3;
// var sides = 6;
// var query = `query RollDice($dice: Int!, $sides: Int) {
//   rollDice(numDice: $dice, numSides: $sides)
// }`;
//
// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,                       <--- autoescapes vars
//     variables: { dice, sides },  <--- $dice and $sides
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));
