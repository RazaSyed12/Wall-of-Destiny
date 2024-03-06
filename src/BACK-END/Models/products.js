const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pic: {
        type: String,
        required: true
    },
    cost_price: {
        type: Number,
        required: true
    },
    sales_price: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
