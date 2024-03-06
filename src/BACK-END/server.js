const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Customer = require('./Models/customers');
const Admin = require('./Models/admin');
const Product = require('./Models/products');
const Discount = require('./Models/discount');
const Cart = require('./Models/cart');
const Order = require('./Models/order');

const app = express();

// const dbURI = 'mongodb+srv://moiz_nafey:abcd1234@cluster0.fkrxm.mongodb.net/utilities?retryWrites=true&w=majority';

const dbURI = 'mongodb+srv://muhammadraza1292:Eo3L9yHGW1B5ZOvD@cluster0.kjgf5le.mongodb.net/WOD?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(7000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));


app.post('/add_product', (req, res) => {
    // let username = req.body.username;
    // let name = req.body.name;
    const product = new Product({
        name: 'Carpet6',
        pic: 'https://d2wd2j5j7vio4j.cloudfront.net/data/carpets/Medium/2x/273-15890-150x150-01.jpg',
        cost_price: 2000,
        sales_price: 3000,
        profit: 1000,
        dimensions: '3x5x6',
        color: 'Red',
        details: 'Nice product pls buy',
        category: 'Carpet',
        featured: '1'
    });

    product.save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

})

app.get('/discount', (req, res) => {
    // let username = req.body.username;
    // let name = req.body.name;
    const discount = new Discount({
        percentage: 69,
        promocode: "MUFTA2",
        customers: ['silalsexy']
    });

    discount.save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

})

// app.get('/cart', (req,res) => {
//     // let username = req.body.username;
//     // let name = req.body.name;
//     const cart = new Cart({
//         customer_username: 'Mahad123',
//         product_name: 'Black Clock',
//         quantity: 2
//     });

//     cart.save()
//     .then ((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     });

// })

// app.get('/order_one', (req, res) => {
//     const order = new Order({
//         customer_username: 'Arslan123',
//         product_name: 'Fancy Wall Clock ',
//         quantity: 2,
//         status: 'processing',
//         discount: 10
//     });

//     order.save()
//     .then ((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     });
// })

// api call to view the data in array of objects
// app.post('/login', (req,res) =>{
//     Customer.find()
//       .then((res) => {
//           res.map(cus => {
//               console.log(cus.name);
//           })

//       })
//       .catch((err) => {
//           console.log(err);
//       });
// })