'use strict'

var graphql = require('graphql').graphql;
var schema = require('./lib/graphql/schema');
var root = require('./lib/graphql/root');

exports.handler = (event, context, callback) => {

  console.log("event", event)
  console.log("context", context)
  console.log("qs", event.queryStringParameters)
  console.log("qs.q", event.queryStringParameters.query)
  graphql(schema, event.queryStringParameters.query, root).then((result) => {
    var response = {
      statusCode: 200,
      headers: {"Access-Control-Allow-Origin": "*"}, // CORS
      body: JSON.stringify(result)
    }
    callback(null, response)
  });


}
