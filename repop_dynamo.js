const { addUpdateBid, addUpdateCustomer } = require('./dynamo');

const repopBids = false
const repopCustomers = false

if (repopBids) {
    // Used for adding new AUCTION_TABLE_NAME table entries for testing only
    for (i = 0; i < 25; i++){
        const bidderId = parseInt(Math.floor(Math.random()*10000)+1);
        const bidId = parseInt(Math.floor(Math.random()*1000)+1);
        const bidAmount = parseInt(Math.floor(Math.random()*1000)+1);
        const slpAddr = "simpleledger:" + parseInt(Math.floor(Math.random()*10000)+1) + "83c07s2md3hu32jdhdyfjrq53a6yhgnyueava4"
        const tokenCount = parseInt(Math.floor(Math.random()*100)+1);

        const bid = {
        "auctionId": "DTM-TEST",
        "customer": "Zulu Corp",
        "dtm": Date.now(),
        "tokenType": "ZULU",
        "bidderId": bidderId,
        "bidId": bidId,
        "bidAmount": bidAmount,
        "name": "Alice Ethereum",
        "email": "alice@here.co",
        "phone": "234-567-8910",
        "tokenCount": tokenCount,
        "slpAddress": slpAddr
        }
        console.log (bid)
        addUpdateBid(bid)
    }
}


// // Used for adding new CUSTOMER_TABLE_NAME table entries for testing only
if (repopCustomers){
    const customer1Id = parseInt(Math.floor(Math.random()*10000)+1);
    const customer2Id = parseInt(Math.floor(Math.random()*10000)+1);

    const customer1 = {
        "customerId": customer1Id,
        "customerName": "Zulu Corp",
        "engagementDate": Date.now(),
        "tokenType": "ZULU",
        "auctionStartDate": Date.now(),
        "auctionEndDate": 1650081599000,
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
    const customer2 = {
        "customerId": customer2Id,
        "customerName": "Quartz Corp",
        "engagementDate": Date.now(),
        "tokenType": "QUARTZ",
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
    addUpdateCustomer(customer1)
    console.log (customer1)
    addUpdateCustomer(customer2)
    console.log (customer2)
}