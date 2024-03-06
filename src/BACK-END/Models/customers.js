const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;