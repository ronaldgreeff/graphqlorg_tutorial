var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Most times, you want to return an object from the API, not just a val
// from this:
  // type Query {
  //   rollDice(numDice: Int!, numSides: Int): [Int]
  // }
// to this RandomDie object:
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
// RandomDie GraphQL type:
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

var root = {
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
  }
};
// then use the query (see notes at end):
// {
//   getDie(numSides: 6) {
//     rollOnce
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

// Notes:
// if you run:
//
// {
//   getDie(numSides: 6)
// }
//
// You get the following error message:
//   "Field \"getDie\" of type \"RandomDie\" must have a selection of subfields. Did you mean \"getDie { ... }\"?",
//
// You need:
//
// {
//   getDie(numSides: 6) {
//     roll(numRolls: 3)
//   }
// }
