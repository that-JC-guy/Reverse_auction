const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "reverse-auction-table";

const getBids = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const bids = await dynamoClient.scan(params).promise();
    //console.log(bids);
    return bids;
}

var allBids = getBids();

async function addUpdateBid(bid) {
    const params = {
        TableName: TABLE_NAME,
        Item: bid
    };
    return await dynamoClient.put(params).promise();
}

module.exports = {
    dynamoClient,
    getBids,
    addUpdateBid
}

/*const bid = {
    "bidId": 1,
    "bidAmount": 990,
    "name": "Joe Test",
    "streetAddress": "99 Here St",
    "city": "Springfield",
    "state": "IL",
    "zipcode": "15251",
    "tokenCount": 5
}

addUpdateBid(bid);
*/