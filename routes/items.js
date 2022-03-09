const express = require('express'); //Request routing
const bcrypt = require('bcrypt'); //Password hashing
const { Item, validateItem } = require('../models/item'); //Item model and validation


// define router
const router = express.Router();


// add all items via excel?? 

// collection data get
// youtube video get
// add image put


// add new item
router.post('/newitem', async (req, res) => {
    try {
    //new post validation
    //validation error handling here

    const item = new Item({
        itemName: req.body.itemName,
        category: req.body.category,
        quantityOwned: req.body.quantityOwned,
        quantityNeeded: req.body.quantityNeeded,
        costPer: req.body.costPer,
        dateBought: req.body.dateBought,
        futureMonth: req.body.futureMonth,
        notes: req.body.notes
    

    })
    await item.save();
    return res.send(item);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});

// get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort( {postedOn: -1} );
        return res.send(items);
    }
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    };
});



module.exports = router;
