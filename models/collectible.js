const mongoose = require('mongoose');


// items schema
const itemSchema = new mongoose.Schema({
    item: {type: String, required: true, minlength: 2, maxlength: 250},
    category: {type: String, minlength: 4, maxlength: 50},
    quantityOwned: {type: Number, required: true, default: 0},
    quantityNeeded: {type: Number, required: true, default: 0},
    costPer: {type: Number},
    monthBought: {type: String, required: true},
    futureMonth: {type: String, required: true},
    notes: {type: String, maxlength: 1000}

})

// create item model
const Item = mongoose.model('Item', itemSchema);

exports.Item = Item; 
