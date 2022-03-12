// Functions related to bid management AFTER retrieval from DB source.
const { getBids, addUpdateBid } = require('./dynamo');

function getLowestBid(bids) {
    console.log(bids)
    //let processedBids = [bids.$response.data.Items]
    // processedBids = bids
    // allBids = []
    // for (i = 0; i <= processedBids.length; i++) {
    //     allBids[i] = processedBids[0][i]["bidAmount"]
    // }
    // const lowestBid = Math.min(...allBids)
    // return lowestBid
}

function getTopTenBids(bids) {
    let processedBids = [bids.$response.data.Items]
    allBids = []
    for (i = 0; i <= 10; i++) {
        allBids[i] = processedBids[0][i]["bidAmount", "slpAddress"]
    }
}

module.exports = {
    getLowestBid,
    getTopTenBids
}

// Code below for testing only

async function init() {
    var allBids = await getBids()
    console.log(allBids)
    var lowestBid = getLowestBid(allBids)
    console.log('Lowest Bid: ' + lowestBid)
}

init ()