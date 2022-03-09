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
    //console.log(bids.$response.data.Count)

    //let processedBids = [bids.$response.data.Items]
    //var test = processedBids[0][0].city
    //console.log(test)

    return bids;
}

async function addUpdateBid(bid) {
    const params = {
        TableName: TABLE_NAME,
        Item: bid
    };
    return await dynamoClient.put(params).promise();
}

function displayBids(bids) {
    let processedBids = [bids.$response.data.Items]
    allBids = []
    for (i = 0; i <= processedBids.length; i++) {
        allBids[i] = processedBids[0][i]["bidAmount"]
    }
    console.log(allBids)
}

async function init() {
    var allBids = await getBids()
    displayBids(allBids)
}

init ()

module.exports = {
    dynamoClient,
    getBids,
    addUpdateBid
}

/* // Used for adding new table entries for testing only
const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
const bidId = parseInt(Math.floor(Math.random()*1000)+1);

const bid = {
"auctionId": "2Q2022-TEST",
"bidderId": bidderId,
"bidId": bidId,
"bidAmount": 990,
"name": "John Q. Tokenholder",
"streetAddress": "123 Main St",
"city": "Manchester",
"state": "NH",
"zipcode": "03102",
"tokenCount": 5,
}



addUpdateBid(bid);
*/