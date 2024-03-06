const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    percentage: {
        type: Number,
        required: true

    },
    promocode: {
        type: String,
        required: true
    },
    customers: {
        type: Object,
        required: true
    }

}, {timestamps: true});

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;
