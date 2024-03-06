const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        // we can also do this: required: [true, 'Username is always required']. The 2nd argument is a string displayed if Username is not entered.
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
