var arc = require('@architect/functions');
var AWS = require('aws-sdk');
var endpoint = new AWS.Endpoint('http://localhost:5000');
var db = process.env.NODE_ENV === 'testing' ? new AWS.DynamoDB({endpoint}) : new AWS.DynamoDB;
var doc = process.env.NODE_ENV === 'testing' ? new AWS.DynamoDB.DocumentClient({endpoint}) : new AWS.DynamoDB.DocumentClient();
var tableName = process.env.NODE_ENV === 'testing' ? 'todoMVC-arc-lambda-staging-todos' : 'todoMVC-arc-lambda-' + process.env.NODE_ENV + '-todos';
var uuidv1 = require('uuid/v1');

function route(req, res) {
  doc.scan({
    TableName: tableName,
    FilterExpression: 'storeID = :sID',
    ExpressionAttributeValues: {
      ":sID": req.params.storeID
    }
  }, function(err, data) {
    var d = data.Count ? data.Items : {newID:uuidv1()};
    res({
      json: d
    });
  });
}

exports.handler = arc.json.get(route)
