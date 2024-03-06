const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_username: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }

}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;