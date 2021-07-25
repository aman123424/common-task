const { Schema } = require("mongoose");

const mongoose = ("mongoose");

const productsSchema = new Schema({
    title:{
        type: String,
        minlength: 2,
        required: true
    },
    description:{
        type: String,
        minlength: 2,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = productsSchema;