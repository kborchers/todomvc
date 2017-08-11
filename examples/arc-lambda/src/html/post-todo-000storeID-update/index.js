var arc = require('@architect/functions')
var AWS = require('aws-sdk');
var endpoint = new AWS.Endpoint('http://localhost:5000');
var db = process.env.NODE_ENV === 'testing' ? new AWS.DynamoDB({endpoint}) : new AWS.DynamoDB;
var doc = process.env.NODE_ENV === 'testing' ? new AWS.DynamoDB.DocumentClient({endpoint}) : new AWS.DynamoDB.DocumentClient();
var tableName = process.env.NODE_ENV === 'testing' ? 'todoMVC-arc-lambda-staging-todos' : 'todoMVC-arc-lambda-' + process.env.NODE_ENV+'-todos';

function route(req, res) {
  var item = req.body;
  var id = item.id;
  delete item.id;
  var keys = Object.keys(item);
  var ue = "set ";
  var eav = {};

  keys.forEach(function(k, i) {
    ue += `${k} = :${i}`;
    if (i+1 < keys.length) ue += ", ";
    eav[`:${i}`] = item[k];
  });

  doc.update({
    TableName: tableName,
    Key: {
      "storeID": req.params.storeID,
      "id": id
    },
    UpdateExpression: ue,
    ExpressionAttributeValues: eav
  }, function(err, data) {
    if(err) console.log(err);
  });
}

exports.handler = arc.json.get(route)
