var fs = require('fs');
var buildSchema = require('graphql').buildSchema;
var Source = require('graphql').Source;

const schemaFile = fs.readFileSync("./lib/graphql/schema.graphql")
var schema = buildSchema(new Source(schemaFile));

module.exports = schema
