const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {itemSchema} = require('./item')


// user schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 1, maxlength: 30},
    lastName: {type: String, required: true, minlength: 1, maxlength: 30},
    email: {type: String, unique: true, required: true, minlength: 5, maxlength: 255},
    password: {type: String, required: true, minlength: 6, maxlength: 255},
    youTubeLinkString: {type: String},
    biography: {type: String, maxlength: 500, default:''},
    collectionInfo: {type: String, maxlength: 500, default:''},
    // the array should be inside the brackets (inside an object), not an array as a type
    collectionItems: {type: [itemSchema], default: []},
    images: {type: String, default: ""},
    files: {type: String, default: ""}
});

//JWT assignment
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        biography: this.biography,
        collectionInfo: this.collectionInfo,
        image: this.image,
        file: this.file,
    },
    config.get('jwtSecret'));
};


//create a model
const User = mongoose.model('User', userSchema);

//Joi validation
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        image: Joi.string(),
        file: Joi.string(),

    });
    return schema.validate(user);
};



exports.User = User;
exports.validateUser = validateUser;
