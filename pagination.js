const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "reverse-auction-table";
const params = {
    TableName: TABLE_NAME
}

//------SCAN PAGINATION------//
module.exports.recurse = (event, context, callback) => {
  var results = []

  const unfoldAsync = (transform, initial) =>
  transform(initial).then(
    next => next && unfoldAsync(transform, next)
  )

  unfoldAsync(lastEvaluatedKey =>
  scan(lastEvaluatedKey).then(data => {
    console.log("Count: " + data.Count, "LEK: " + data.LastEvaluatedKey)
    results = results.concat(data.Items)
    return data.LastEvaluatedKey
  })
).then(() => {
  console.log('Results Count', results.length)
  console.log('Results', results)
})
}

const scan = (lastEvaluatedKey) => {
  return dynamoClient.scan({ TableName: "reverse-auction-table", Limit: 10, ExclusiveStartKey: lastEvaluatedKey }).promise()
}

module.exports.recurse()

