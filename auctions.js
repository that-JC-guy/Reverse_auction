// Functions related to auction management AFTER retrieval from DB source.
const { getAllCustomers } = require('./dynamo');

function getActiveAuctions(customers) {
    let allCustomers = customers.$response.data.Items
    //console.log(allCustomers[0][auctionStartDate])
    auctionInfo = []
    curTime = Date.now()

    for (i = 0; i < customers.$response.data.Count; i++) {
        if (curTime > customers.$response.data.Items[i].auctionStartDate && curTime < customers.$response.data.Items[i].auctionEndDate) {     // Determine if current time is within the auction window (i.e. auction is live)
            const customerInfo = {                                  // Extract needed customer info IF auction is live
                'customerName': customers.$response.data.Items[i].customerName,
                'auctionStart': customers.$response.data.Items[i].auctionStartDate,
                'auctionEnd': customers.$response.data.Items[i].auctionEndDate,
                'tokenType': customers.$response.data.Items[i].tokenType
            }
            auctionInfo.push(customerInfo)
        }        
    }
    return auctionInfo
}

async function init() {
    const customers = await getAllCustomers()
    //console.log(customers)
    const activeAuctions = getActiveAuctions(customers)
    console.log(activeAuctions)
}

init ()