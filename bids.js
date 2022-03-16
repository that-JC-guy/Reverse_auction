// Functions related to bid management AFTER retrieval from DB source.
const { getBids } = require('./dynamo');

function getLowestBid(bids) {
    let processedBids = [bids.$response.data.Items]

    allBids = []
    for (i = 0; i < bids.$response.data.Count; i++) {
        allBids[i] = processedBids[0][i]["bidAmount"]
        //console.log('Bid Entry: ' + processedBids[0][i]["bidAmount"])
    }
    const lowestBid = Math.min(...allBids)
    return lowestBid
}

function sortBids(bids){
    let allBids = bids.$response.data.Items
    const sortedBids = allBids.sort(function(a,b){return a.bidAmount - b.bidAmount})

    return sortedBids
}

function getTopTenBids(bids) {
    let processedBids = bids.$response.data.Items

    // load the relevant bid data into new object
    allBids = []
    for (i = 0; i < bids.$response.data.Count; i++) {
        const bidPair = {
            'dtm': processedBids[i]['dtm'],
            'bidAmount': processedBids[i]['bidAmount'],  
            'slpAddress': processedBids[i]['slpAddress'] 
        }
        allBids.push(bidPair)
    }
    
    //sort all bids by bidAmount in ascending order
    let sortedBids = allBids.sort(function(a,b){return a.bidAmount - b.bidAmount})

    //return the top ten bids
    topTenBids = []
    for (i = 0; i < 10; i++){
        topTenBids[i] = sortedBids[i]
    }

    return topTenBids
}

module.exports = {
    getLowestBid,
    getTopTenBids
}

// Code below for testing only

// async function init() {
//     var allBids = await getBids()
//     console.log(allBids)
//     var lowestBid = getLowestBid(allBids)
//     console.log('Lowest Bid: ' + lowestBid)
//     var topTenBids = getTopTenBids(allBids)
//     console.log(topTenBids)
// }

// init ()