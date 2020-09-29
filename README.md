# Getting Started With GraphQL.js
https://graphql.org/graphql-js/

## Basic Structure
GraphQL isn't a query language (like SQL), it's an alternative to REST APIs.

To handle GraphQL queries, define a SCHEMA (defines the Query type),  and an API root with a RESOLVER function per API endpoint.

The schema defines what types of data a client can read from / write to your data graph.
Note uses back quotes (``, not '') for defining the schema.

A resolver function returns one of the following:
-  Data of the type required by the resolver's corresponding schema field (string, integer, object, etc.)
 - A promise that fulfills with data of the required type

### Basic api server:
~~~
var app = express();
 app.use('/graphql', graphqlHTTP({
   schema: schema,
   rootValue: root,
   graphiql: true,
 }));
 app.listen(4000);
~~~
> `graphiql: true` enables GraphiQL interactive interface


When passing in arguments via browser, use `$` syntax to define variables in the query and pass them as variables in a separate map:

#### Query
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
> **schema**
> ~~~
> type Query {
>  rollDice(numDice: Int!, numSides: Int): [Int]
>}
>~~~
#### Mutation
~~~
var author = 'andy';
var content = 'hope is a good thing';
var query = `mutation CreateMessage($input: MessageInput) {
 createMessage(input: $input) {
   id
 }
}`;
...
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
...
~~~
