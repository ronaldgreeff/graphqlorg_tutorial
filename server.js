var { graphql, buildSchema } = require('graphql');

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

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
