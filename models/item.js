const mongoose = require('mongoose');
const Joi = require('joi');


// items schema
const itemSchema = new mongoose.Schema({
    itemName: {type: String, required: true, minlength: 2, maxlength: 250},
    category: {type: String, minlength: 4, maxlength: 50},
    quantityOwned: {type: Number, required: true, default: 0},
    quantityNeeded: {type: Number, required: true, default: 0},
    costPer: {type: Number},
    dateBought: {type: Date, required: true},
    futureMonth: {type: String, required: true},
    notes: {type: String, maxlength: 1000}

})

// create item model
const Item = mongoose.model('Item', itemSchema);

//Joi validation
function validateItem(item) {
    const schema = Joi.object({
        itemName: Joi.string().min(2).max(250).required(),
        category: Joi.string().min(4).max(50).required(),
        quantityOwned: Joi.number().required(),
        quantityNeeded: Joi.number().required(),
        costPer: Joi.number(),
        dateBought: Joi.date().required(),
        futureMonth: Joi.string().required(),
        notes: Joi.string().max(1000),

    });
    return schema.validate(user);
};

exports.Item = Item; 
exports.validateItem = validateItem;
