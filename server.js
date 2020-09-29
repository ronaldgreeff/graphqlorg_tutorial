var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

const loggingMiddleware = (req, res, next) => {
  console.log('ip:', req.ip);
  next();
}

var root = {
  ip: function (args, request) {
    return request.ip;
  }
};

// It's simple to use any Express middleware in conjunction with express-graphql.
// In particular, this is a great pattern for handling authentication:
var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

// In a REST API, authentication is often handled with a header, that contains an
// auth token which proves what user is making this request. Express middleware
// processes these headers and puts authentication data on the Express request
// object. Some middleware modules that handle authentication like this are
// Passport, express-jwt, and express-session. Each of these modules works with
// express-graphql.
