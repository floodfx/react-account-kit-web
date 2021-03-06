var express = require('express');
var graphqlHTTP = require('express-graphql');
var fs = require('fs');
var cors = require('cors');
var config = require('./src/config');
var root = require('./src/graphql/root');
var schema = require('./src/graphql/schema');

var app = express();

app.use(cors());

var isProd = process.env.NODE_ENV === 'production'

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: !isProd
}));

if(!isProd) {
  console.log('CSRF', config.get('CSRF'))
}

app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');

module.exports = app
