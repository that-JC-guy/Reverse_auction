const { addUpdateBid, addUpdateAuction } = require('./dynamo');

const repopBids = false
const repopAuctions = true

if (repopBids) {
    // Used for adding new BID_TABLE_NAME table entries for testing only
    for (i = 0; i < 10; i++){
        const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
        const bidId = parseInt(Math.floor(Math.random()*1000)+1) + "-d6e8977cb02e49eab879cdbca26979b6";
        const bidAmount = parseInt(Math.floor(Math.random()*1000)+1);
        const tokenCount = parseInt(Math.floor(Math.random()*100)+1);

        const bid = {
        "auctionId": "ZULU-TEST",
        "dtm": Date.now(),
        "tokenType": "ZULU",
        "bidId": bidId,
        "bidAmount": bidAmount,
        "name": "Alice Ethereum",
        "email": "alice@here.co",
        "phone": "234-567-8910",
        "tokenCount": tokenCount
        }
        console.log (bid)
        addUpdateBid(bid)
    }
}


// // Used for adding new CUSTOMER_TABLE_NAME table entries for testing only
if (repopAuctions){
    const customer1Id = parseInt(Math.floor(Math.random()*10000)+1);
    const customer2Id = parseInt(Math.floor(Math.random()*10000)+1);

    const auction1 = {
        "auctionId": "DTM-TEST",
        "tokenType": "ZULU",
        "auctionStartDate": Date.now(),
        "auctionEndDate": 1650081599000,
        "customerId": customer1Id,
        "customerName": "Zulu Corp",
        "engagementDate": Date.now(),
        "contacts": {
            "primaryContact": {
                "name": "Alice Zulu",
                "email": "alice@zulu.co",
                "phone": "234-567-8910",
                "address": "123 Zulu Street",
                "address2": "",
                "city": "Zulu City",
                "state": "NH",
                "zipcode": "03102"
            },
            "businessContact": {
                "name": "Alice Zulu",
                "email": "alice@zulu.co",
                "phone": "234-567-8910",
                "address": "123 Zulu Street",
                "address2": "",
                "city": "Zulu City",
                "state": "NH",
                "zipcode": "03102"
            },
            "technicalContact": {
                "name": "Alice Zulu",
                "email": "alice@zulu.co",
                "phone": "234-567-8910",
                "address": "123 Zulu Street",
                "address2": "",
                "city": "Zulu City",
                "state": "NH",
                "zipcode": "03102"
            },
            "financialContact": {
                "name": "Alice Zulu",
                "email": "alice@zulu.co",
                "phone": "234-567-8910",
                "address": "123 Zulu Street",
                "address2": "",
                "city": "Zulu City",
                "state": "NH",
                "zipcode": "03102"
            }
        }
    }
    const auction2 = {
        "auctionId": "QUARTZ-TEST",
        "tokenType": "QUARTZ",
        "customerId": customer2Id,
        "customerName": "Quartz Corp",
        "engagementDate": Date.now(),
        "auctionStartDate": Date.now(),
        "auctionEndDate": 1650081599000,
        "contacts": {
            "primaryContact": {
                "name": "John Quartz",
                "email": "john@quartz.co",
                "phone": "234-567-8910",
                "address": "123 Quartz Street",
                "address2": "",
                "city": "Quartz City",
                "state": "NH",
                "zipcode": "03102"
            },
            "businessContact": {
                "name": "John Quartz",
                "email": "john@quartz.co",
                "phone": "234-567-8910",
                "address": "123 Quartz Street",
                "address2": "",
                "city": "Quartz City",
                "state": "NH",
                "zipcode": "03102"
            },
            "technicalContact": {
                "name": "John Quartz",
                "email": "john@quartz.co",
                "phone": "234-567-8910",
                "address": "123 Quartz Street",
                "address2": "",
                "city": "Quartz City",
                "state": "NH",
                "zipcode": "03102"
            },
            "financialContact": {
                "name": "John Quartz",
                "email": "john@quartz.co",
                "phone": "234-567-8910",
                "address": "123 Quartz Street",
                "address2": "",
                "city": "Quartz City",
                "state": "NH",
                "zipcode": "03102"
            }
        }
    }
    addUpdateAuction(auction1)
    console.log (auction1)
    addUpdateAuction(auction2)
    console.log (auction2)
}