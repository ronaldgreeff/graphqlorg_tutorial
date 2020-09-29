Getting Started With GraphQL.js
https://graphql.org/graphql-js/

To handle GraphQl queries, define SCHEMA that defines the Query type - note that use of back quotes.
GraphQL schema defines what types of data a client can read and write to your data graph

We also need an API root with a RESOLVER function per API endpoint
A resolver function returns one of the following:
  Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.)
  A promise that fulfills with data of the required type

Basic api server:
~~~
var app = express();
 app.use('/graphql', graphqlHTTP({
   schema: schema,
   rootValue: root,
   graphiql: true,
 }));
 app.listen(4000);
~~~
graphical: true enables GraphiQL interactive interface


When passing in arguments via browser, use $ syntax to define variables in query and pass the queries the variables as a separate map

Example schema:
~~~
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
~~~

Query
~~~
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
~~~
Mutation
~~~
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
 createMessage(input: $input) {
   id
 }
}`;

fetch('/graphql', {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
 },
 body: JSON.stringify({
   query,
   variables: {
     input: {
       author,
       content,
     }
   }
 })
})
 .then(r => r.json())
 .then(data => console.log('data returned:', data));
 ~~~
