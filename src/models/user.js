const mongoose = require('mongoose');
const Joi = require("joi");

const schema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    }
})

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(1024).required()
    });
    return schema.validate(user);
}

const Model = mongoose.model("User", schema);

exports.userModel = Model;
exports.validate = validateUser;