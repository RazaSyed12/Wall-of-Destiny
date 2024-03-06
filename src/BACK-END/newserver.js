const nodemailer = require("nodemailer");
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Customer = require('./Models/customers');
// const passwordHash = require('password-hash');

const app = express();

const dbURI = 'mongodb+srv://muhammadraza1292:Eo3L9yHGW1B5ZOvD@cluster0.kjgf5le.mongodb.net/WOD?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));


// SENDING EMAIL CODE

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wallsofdestiny123@gmail.com',
        pass: 'wallsofdestiny'
    }
});

let mailOptions = {
    from: 'wallsofdestiny123@gmail.com',
    to: 'muhammadraza1292@gmail.com',
    subject: 'Welcome to the Walls of Destiny',
    text: 'Enter the following pin for successful sign-up \n4565'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});



// HASHING PASSWORDS CODE

//  var hashedPassword = passwordHash.generate('password123'); // variable contains hashed value of password
//  console.log(hashedPassword);

//  console.log(passwordHash.verify('password123',hashedPassword)); // returns true (Boolean dt)
//  console.log(passwordHash.verify('password1234',hashedPassword)); // returns false (Boolean dt)