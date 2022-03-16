const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const { all } = require('express/lib/application');
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
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "reverse-auction-table";

const getBids = async () => { // Retrieve all bids from DynamoDB
    try {
        const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'auctionId = :ai',                      //primary key and shortcut (can add 'and [sort key name] = :sk')
            ProjectionExpression: 'bidderId, dtm, bidAmount, slpAddress',    //filter fields being returned
            ExpressionAttributeValues: {                                    //What you are searching for in Partition/Sort Key
                ':ai' : 'DTM-TEST'                           
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


module.exports = {
    dynamoClient,
    getBids,
    addUpdateBid
}

//---===== TESTING CODE ONLY ====---//
// Code below for testing only

// async function init() {
//     const allBids = await getBids()
//     console.log(allBids)
//     console.log('Total Bid Count: ' + allBids.$response.data.Count)

// }

// init ()


// // Used for adding new table entries for testing only
// for (i = 0; i < 24; i++){
//     const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
//     const bidId = parseInt(Math.floor(Math.random()*1000)+1);
//     const bidAmount = parseInt(Math.floor(Math.random()*1000)+1);
//     const slpAddr = "simpleledger:" + parseInt(Math.floor(Math.random()*10000)+1) + "83c07s2md3hu32jdhdyfjrq53a6yhgnyueava4"

//     const bid = {
//     "auctionId": "DTM-TEST",
//     "dtm": Date.now(),
//     "tokenType": "Q",
//     "bidderId": bidderId,
//     "bidId": bidId,
//     "bidAmount": bidAmount,
//     "name": "John Q. Tokenholder",
//     "streetAddress": "123 Main St",
//     "city": "Manchester",
//     "state": "NH",
//     "zipcode": "03102",
//     "phone": "234-567-8910",
//     "tokenCount": 5,
//     "slpAddress": slpAddr
//     }
//     console.log (bid)
//     addUpdateBid(bid)
// }


