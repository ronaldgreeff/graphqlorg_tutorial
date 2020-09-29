Getting Started With GraphQL.js
https://graphql.org/graphql-js/

To handle GraphQl queries, define SCHEMA that defines the Query type - note that use of back quotes.

We also need an API root with a RESOLVER function per API endpoint

Basic api server:
  `var app = express();
   app.use('/graphql', graphqlHTTP({
     schema: schema,
     rootValue: root,
     graphiql: true,
   }));
   app.listen(4000);`

graphical: true enables GraphiQL interactive interface


When passing in arguments via browser, use $ syntax to define variables in query and pass the queries the variables as a separate map

Example schema:
 `type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }`

Browser code to use:
var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
 rollDice(numDice: $dice, numSides: $sides)
}`;

fetch('/graphql', {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
 },
 body: JSON.stringify({
   query, //                        <--- auto-escapes $dice and
   variables: { dice, sides }, //   <--- $sides vars in query
 })
})
 .then(r => r.json())
 .then(data => console.log('data returned:', data));
