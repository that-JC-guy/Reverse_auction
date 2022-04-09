const express = require('express');
const { json } = require('express/lib/response');
const { getBids, addUpdateBid } = require('./dynamo');
const { getLowestBid, getTopTenBids } = require('./bids')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true})); //fixes inputs in the case they include special characters

app.get('/', async (req, res) => {
    try {
        const bids = await getBids();
        // console.log(bids)
        const bidsTopTen = getTopTenBids(bids)
        res.render('index', { sentBids: bidsTopTen});
     }  catch (error) {
        console.error(err);
        res.status(500).json({err: "Something went wrong..."})
    }
    
});
 
app.get('/bids', async (req, res) =>{
    try {
        const bids = await getBids();
        console.log(bids)
        const bidsTopTen = getTopTenBids(bids)
        res.json(bids)
    } catch (error) {
        console.error(err);
        res.status(500).json({err: "Something went wrong..."})
    }
})

app.post('/submit_bid', async (req, res) =>{
    const bid = req.body;
    try {
        const bid = await addUpdateBid();
        res.json(bid)
    } catch (error) {
        console.error(err);
        res.status(500).json({err: "Something went wrong..."})
    }
})


/* FORM CODE */
/*
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true})); //fixes inputs in the case they include special characters

app.get('/form-with-post', function(request, response) {
    return response.render('form-with-post');
});

app.post('/submit-form-with-post', function(request, response) {
    return response.send(request.body);
});


const port = process.env.PORT || 5000;
 
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

*/
