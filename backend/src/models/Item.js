const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

     name: {
        type: String,
        required: true
     },

     description: {
        type: String,
        required: true
     },

     price: {
        type: Number,
         required: true
     },

     category: {
        type: String,
        required: true
     },

     image: {
         type: String,
        required: true
     },

     stock: {
        type: Number,
        required: true,
        default: 0
     }

}, {timestamps: true});

module.exports = mongoose.model("Item", itemSchema);