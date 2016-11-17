var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema, Source } = require('graphql');
var fs = require('fs');
var cors = require('cors');
var root = require('./src/graphql/root');
var config = require('./src/config');


// load schema from file
const schemaFile = fs.readFileSync("./src/graphql/schema.graphql")
var schema = buildSchema(new Source(schemaFile));

var app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production',
}));

app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');
