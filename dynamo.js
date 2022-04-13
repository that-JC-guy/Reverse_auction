const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const { all } = require('express/lib/application');
require('dotenv').config();

const dynamodbLocal = false

if (dynamodbLocal){ 
    AWS.config.update({
        region: 'localhost',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        endpoint: 'http://localhost:8000'
    });
} else {
    AWS.config.update({
        region: process.env.AWS_DEFAULT_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

}



const dynamoClient = new AWS.DynamoDB.DocumentClient();
const BID_TABLE_NAME = "reverse-auction-bids";
const AUCTION_TABLE_NAME = "reverse-auction-auctions";


const getBids = async () => { // Retrieve all bids from DynamoDB
    try {
        const params = {
            TableName: BID_TABLE_NAME,
            KeyConditionExpression: 'auctionId = :ai',                                  //primary key and shortcut (can add 'and [sort key name] = :sk')
            ProjectionExpression: 'bidderId, dtm, bidAmount, slpAddress, tokenCount',   //filter fields being returned
            ExpressionAttributeValues: {                                                //What you are searching for in Partition/Sort Key
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
    AWS.config.update({region: 'us-east-1'})
    
    try{
        const params = {
            TableName: BID_TABLE_NAME,
            Item: bid
        };
    return await dynamoClient.put(params).promise();
    } catch (error){
        console.log(error)
    }

}

const getAllCustomers = async () => { // Retrieve customers from DynamoDB
    try {
        const params = {
            TableName: AUCTION_TABLE_NAME,
        };

        var items;
        // do{
        //     items =  await dynamoClient.scan(params).promise();
        //     items.Items.forEach((item) => customers.push(item));
        //     params.ExclusiveStartKey  = items.LastEvaluatedKey;
        // }while(typeof items.LastEvaluatedKey !== "undefined");
        
        const customers = await dynamoClient.scan(params).promise()

        return customers;
    } catch(error){
        console.log(error)
    }
}

async function addUpdateAuction(auction) { // Add or update auction to DyanmoDB
    try {
        const params = {
        TableName: AUCTION_TABLE_NAME,
        Item: auction
         };
        return await dynamoClient.put(params).promise();
    } catch(error){
    console.log(error)
    }
}


module.exports = {
    dynamoClient,
    getBids,
    addUpdateBid,
    getAllCustomers,
    addUpdateAuction
}

//---===== TESTING CODE ONLY ====---//
// Code below for testing only

// async function init() {
// //     const allBids = await getBids()
// //     console.log(allBids)
// //     console.log('Total Bid Count: ' + allBids.$response.data.Count)
//     const allCustomers = await getAllCustomers()
//     console.log(allCustomers)
// }

// init ()


// Used for adding new AUCTION_TABLE_NAME table entries for testing only
// for (i = 0; i < 24; i++){
//     const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
//     const bidId = parseInt(Math.floor(Math.random()*1000)+1);
//     const bidAmount = parseInt(Math.floor(Math.random()*1000)+1);
//     const slpAddr = "simpleledger:" + parseInt(Math.floor(Math.random()*10000)+1) + "83c07s2md3hu32jdhdyfjrq53a6yhgnyueava4"
//     const tokenCount = parseInt(Math.floor(Math.random()*100)+1);

//     const bid = {
//     "auctionId": "DTM-TEST",
//     "customer": "Zulu Corp",
//     "dtm": Date.now(),
//     "tokenType": "Z",
//     "bidderId": bidderId,
//     "bidId": bidId,
//     "bidAmount": bidAmount,
//     "name": "Alice Ethereum",
//     "email": "alice@here.co",
//     "phone": "234-567-8910",
//     "tokenCount": tokenCount,
//     "slpAddress": slpAddr
//     }
//     console.log (bid)
//     addUpdateBid(bid)
// }

// // Used for adding new CUSTOMER_TABLE_NAME table entries for testing only
// const customerId = parseInt(Math.floor(Math.random()*10000)+1);

// const customer = {
//     "customerId": customerId,
//     "customerName": "Zulu Corp",
//     "engagementDate": Date.now(),
//     "tokenType": "ZULU",
//     "auctionStartDate": Date.now(),
//     "auctionEndDate": 1650081599000,
//     "contacts": {
//         "primaryContact": {
//             "name": "Alice Zulu",
//             "email": "alice@zulu.co",
//             "phone": "234-567-8910",
//             "address": "123 Zulu Street",
//             "address2": "",
//             "city": "Zulu City",
//             "state": "NH",
//             "zipcode": "03102"
//         },
//         "businessContact": {
//             "name": "Alice Zulu",
//             "email": "alice@zulu.co",
//             "phone": "234-567-8910",
//             "address": "123 Zulu Street",
//             "address2": "",
//             "city": "Zulu City",
//             "state": "NH",
//             "zipcode": "03102"
//         },
//         "technicalContact": {
//             "name": "Alice Zulu",
//             "email": "alice@zulu.co",
//             "phone": "234-567-8910",
//             "address": "123 Zulu Street",
//             "address2": "",
//             "city": "Zulu City",
//             "state": "NH",
//             "zipcode": "03102"
//         },
//         "financialContact": {
//             "name": "Alice Zulu",
//             "email": "alice@zulu.co",
//             "phone": "234-567-8910",
//             "address": "123 Zulu Street",
//             "address2": "",
//             "city": "Zulu City",
//             "state": "NH",
//             "zipcode": "03102"
//         }
//     }
// }

// console.log (customer)
// addUpdateCustomer(customer)


