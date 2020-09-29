var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Most times, you want to return an object from the API, not just a val
// from this:
  // type Query {
  //   rollDice(numDice: Int!, numSides: Int): [Int]
  // }
// to this RandomDie GraphQL type:
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// Instead of root level resolver, can define a class where resolvers
// are methods of the instance - This ES6 class implements the
// RandomDie object:
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll({numRolls}) {
    var output = [];
    for (var i=0; i<numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  }
};
// --- query:
// {
//   getDie(numSides: 6) {
//     numSides
//     rollOnce
//     roll(numRolls: 3)
//   }
// }
// --- result:
// {
//   "data": {
//     "getDie": {
//       "numSides": 6,
//       "rollOnce": 2,
//       "roll": [
//         3,
//         6,
//         1
//       ]
//     }
//   }
// }

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
