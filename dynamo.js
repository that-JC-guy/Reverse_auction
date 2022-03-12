const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: 'localhost',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: 'http://localhost:8000'
});

// AWS.config.update({
//     region: process.env.AWS_DEFAULT_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     endpointOverride: process.env.AWS_DYNAMODB_ENDPOINT
// });

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "reverse-auction-table";

const getBids = async () => { // Retrieve all bids from DynamoDB
    try {
        const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'auctionId = :ai',                  //primary key and shortcut (can add 'and [sort key name] = :sk')
            //ProjectionExpression: 'bidderId, bidAmount, slpAddress',    //filter fields being returned
            ExpressionAttributeValues: {                                //What you are searching for in Partition/Sort Key
                ':ai' : 'NOTRIGHT-TEST'                           
            },
            ScanIndexForward: false                                     // Sort Key sort order - true = ascending, false = descending
        }
        const bids = await dynamoClient.query(params).promise()
        //console.log(bids)   
        
        return bids;
    } catch(error){
        console.log(error)
    }
}

async function addUpdateBid(bid) { // Add or update bid to DyanmoDB
    const params = {
        TableName: TABLE_NAME,
        Item: bid
    };
    return await dynamoClient.put(params).promise();
}




function getLowestBid(bids) {
    let processedBids = [bids.$response.data.Items]

    allBids = []
    for (i = 0; i < bids.$response.data.Count-1; i++) {
        allBids[i] = processedBids[0][i]["bidAmount"]
        //console.log('Bid Entry: ' + processedBids[0][i]["bidAmount"])
    }
    const lowestBid = Math.min(...allBids)
    return lowestBid
}

function getTopTenBids(bids) {
    let processedBids = [bids.$response.data.Items]
    
    // const json = JSON.parse(processedBids)
    // console.log(json)
    // const jsonAsArray = Object.keys(json).map(function (key) {
    //     return json[key];
    // })
    // .sort(function (itemA, itemB){
    //     return itemA.bidAmount < itemB.bidAmount
    // })
    // console.log(json)
    allBids = []
    for (i = 0; i <= 9; i++) {
        allBids[i] = processedBids[0][i]["bidAmount", "slpAddress"]
    }
    return allBids
}

module.exports = {
    dynamoClient,
    getBids,
    addUpdateBid,
    getLowestBid,
    getTopTenBids
}

// Code below for testing only

async function init() {
    const allBids = await getBids()
    console.log(allBids)
    // console.log('Total Bid Count: ' + allBids.$response.data.Count)
    // const lowestBid = getLowestBid(allBids)
    // console.log('Lowest Bid: ' + lowestBid)
    // const topTenBids = getTopTenBids(allBids)
    // console.log('Top 10 Bids')
    // console.log(topTenBids)

}

//init ()

// Used for adding new table entries for testing only

// const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
// const bidId = parseInt(Math.floor(Math.random()*1000)+1);
// const bidAmount = parseInt(Math.floor(Math.random()*1000)+1);
// const slpAddr = "simpleledger:" + parseInt(Math.floor(Math.random()*10000)+1) + "83c07s2md3hu32jdhdyfjrq53a6yhgnyueava4"

// const bid = {
// "auctionId": "NOTRIGHT-TEST",
// "bidderId": bidderId,
// "bidId": bidId,
// "bidAmount": bidAmount,
// "name": "John Q. Tokenholder",
// "streetAddress": "123 Main St",
// "city": "Manchester",
// "state": "NH",
// "zipcode": "03102",
// "tokenCount": 5,
// "slpAddress": slpAddr
// }
// addUpdateBid(bid);
