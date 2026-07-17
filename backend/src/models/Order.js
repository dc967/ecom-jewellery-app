const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
            quantity: { type: Number, required: true},
            price: { type:Number, required: true}
        }
    ],

    totalPrice: {
            type: Number,
            required: true
    },

    status: {
        type: String,
        enum: ["pending","shipped","delivered","cancelled"],
        default:"pending"
    },

    shippingAddress: {
        type: String,
        required: true
    },

},{ timestamps:true});

module.exports = mongoose.model("Order", orderSchema);