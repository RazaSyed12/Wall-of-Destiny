const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Customer = require('./Models/customers');
const Admin = require('./Models/admin');
const Product = require('./Models/products');
const Discount = require('./Models/discount');
const Cart = require('./Models/cart');
const Order = require('./Models/order');


const app = express();

const dbURI = 'mongodb+srv://muhammadraza1292:Eo3L9yHGW1B5ZOvD@cluster0.kjgf5le.mongodb.net/WOD?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(8000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(morgan('dev'));

//Spin the wheel Promocodes
let discount_codes = {
    "YSIND": 25,
    "TUFND": 20,
    "ABCDE": 20,
    "FTYWI": 15,
    "YDIEB": 15,
    "GYDIE": 10
};

//Spin the Wheel
app.post('SpinWheel', (req, res) => {
    let promo = req.body.promocode;
    let cust_username = req.body.username;
    let discount = undefined;
    if (promo == "TUFND") {
        discount = discount_codes.TUFND;
    }
    if (promo == "YSIND") {
        discount = discount_codes.YSIND;
    }
    if (promo == "FTYWI") {
        discount = discount_codes.FTYWI;
    }
    if (promo == "YDIEB") {
        discount = discount_codes.YDIEB;
    }
    if (promo == "GYDIE") {
        discount = discount_codes.GYDIE;
    }
    if (promo == "ABCDE") {
        discount = discount_codes.ABCDE;
    }
    Discount.insertMany({
        percentage: discount,
        promocode: promo,
        customers: [cust_username]
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong, please try again");
        } else {
            console.log(data);
            res.send("Success");
        }
    })
});

//Finding Products using categories
app.post('/CategoryMenu', (req, res) => {
    Product.find({ category: req.body.category }, (err, data) => {
        if (err) {
            res.send("Something went wrong");
        }
        if (data.length >= 1) {
            console.log("Products found");
            console.log(data);
            res.send(data);
        } else if (data.length == 0) {
            console.log("No product under this category");
            res.send("Incorrect category");
            return;
        }
    })
});

//Adding to cart
app.post('/AddToCart', (req, res) => {
    let cust_username = req.body.username;
    let product_name = req.body.product_name;
    let quantity = 1;
    Cart.find({ customer_username: cust_username, product_name: product_name }, async(err, data) => {
        if (!err) {
            if (data.length >= 1) {
                let total = data[0].quantity;
                let id = data[0]._id;
                total = total + quantity;
                await Cart.updateOne({ "_id": id }, { $set: { quantity: total } });
                res.send("Product added");
            } else {
                Cart.insertMany({
                    customer_username: cust_username,
                    product_name: product_name,
                    quantity: quantity
                }, (err, data) => {
                    if (!err) {
                        console.log("Hogya");
                        console.log(data);
                        res.send("Product added to cart");
                    } else {
                        console.log("F");
                        res.send("Something went wrong, please try again");
                    }
                })
            }
        } else {
            console.log("F");
            res.send("Something went wrong");
        }
    })
});

// Deleting from cart
app.post('/DeleteFromCart', (req, res) => {
    let cust_username = req.body.username;
    let product_name = req.body.product_name;
    Cart.find({ customer_username: cust_username, product_name: product_name }, async(err, data) => {
        if (!err) {
            if (data != null) {
                let total = data[0].quantity;
                let id = data[0]._id;
                if (total > 1) {
                    total = total - 1;
                    await Cart.updateOne({ "_id": id }, { $set: { quantity: total } });
                    res.send("Success");
                } else {
                    await Cart.deleteMany({ customer_username: cust_username, product_name: product_name });
                    res.send("Deleted Product");
                }
            }
        } else {
            console.log("F");
            res.send("Something went wrong");
        }
    })
});

// View Cart
app.post('/ViewCart', (req, res) => {
    let cust_username = req.body.username;
    Cart.find({ customer_username: cust_username }, async(err, data) => {
        if (err) {
            console.log("F");
            console.log(err);
            res.send("Error");
        } else {
            if (data.length >= 1) {
                let final = []
                for (let i = 0; i < data.length; i++) {
                    let name_product = data[i].product_name;
                    let result = await Product.find({ name: name_product });
                    let variables = {
                        "name": result[0].name,
                        "price": result[0].sales_price,
                        "id": result[0]._id,
                        "pic": result[0].pic,
                        "color": result[0].color,
                        "quantity": data[i].quantity
                    }
                    console.log(variables);
                    final.push(variables);
                }
                console.log("Hogya");
                res.send(final);

            } else {
                res.send("Cart is empty");
            }
        }
    })
});

//Clear cart
app.post('/ClearCart', async(req, res) => {
    let cust_username = req.body.username;
    await Cart.deleteMany({ customer_username: cust_username });
    res.send("Cart Cleared Successfully");
});

//Payment Procedure
app.post('/Payment', async(req, res) => {
    let cust_username = req.body.username;
    let discount = (100 - (req.body.discount * 100));
    let items = req.body.items;
    for (let i = 0; i < items.length; i++) {
        let product_name = items[i].name;
        let quantity = items[i].quantity;
        Order.insertMany({
            customer_username: cust_username,
            product_name: product_name,
            quantity: quantity,
            status: "Processing",
            discount: discount
        }, (err, data) => {
            if (!err) {
                console.log("Hogya");
                console.log(data);
                res.send("Order has been placed");
            } else {
                console.log("F");
                res.send("Something went wrong, please try again");
            }
        })
    }
});

//Discount application customer
app.post('/DiscountCust', (req, res) => {
    let promo = req.body.promocode;
    let cust_username = req.body.username;
    Discount.find({ promocode: promo }, async(err, data) => {
        if (err) {
            console.log(err);
            res.send('Something went wrong');
        } else {
            if (data.length >= 1) {
                for (let i = 0; i < data.length; i++) {
                    let cust_arr = data[i].customers;
                    let length1 = cust_arr.length;
                    let id = data[i]._id;
                    for (let j = 0; j < cust_arr.length; j++) {
                        if (cust_username == cust_arr[j]) {
                            cust_arr.splice(j, 1);
                        }
                    }
                    let length2 = cust_arr.length;
                    if (length1 == length2) {
                        res.send('Incorrect Promocode');
                    } else {
                        let amount = (1 - (data[i].percentage / 100));
                        let final = {
                            "discount": amount
                        }
                        if (cust_arr.length == 0) {
                            console.log("Here");
                            await Discount.deleteMany({ promocode: promo });
                            res.send(final);
                        } else {
                            console.log("ELSEHERE")
                            await Discount.updateOne({ "_id": id }, { $set: { customers: cust_arr } });
                            res.send(final);
                        }
                    }
                }
            } else {
                console.log("Jhoot bolta saala");
                res.send("Incorrect Promocode");
            }
        }
    })
});

//View Orders Admin
app.get('/ViewOrdersAd', (req, res) => {
    Order.find({}, async(err, data) => {
        if (err) {
            console.log(err);
            res.send('Something went wrong');
        } else {
            if (data.length >= 1) {
                let final = []
                for (let i = 0; i < data.length; i++) {
                    let result = await Product.find({ name: data[i].product_name });
                    let variables = {
                        "name": result[0].name,
                        "sales_price": result[0].sales_price,
                        "pic": result[0].pic,
                        "quantity": data[i].quantity,
                        "status": data[i].status,
                        "order_id": data[i]._id
                    }
                    final.push(variables);
                }
                console.log(final);
                res.send(final);
            } else {
                res.send('No orders yet')
            }
        }
    })
});

//Sales Admin
app.get('/ViewSales', (req, res) => {
    Order.find({ quantity: { $gte: 1 } }, async(err, data) => {
        if (err) {
            console.log(err);
            res.send('Something went wrong');
        } else {
            if (data.length >= 1) {
                let income = 0;
                let profit = 0;
                let customer_count = await Customer.count();
                let order_count = data.length;
                for (let i = 0; i < data.length; i++) {
                    let result = await Product.find({ name: data[i].product_name });
                    if (data[i].discount != 0) {
                        let dis = (1 - (data[i].discount / 100));
                        let sales = result[0].sales_price * data[i].quantity * dis;
                        let cost = result[0].cost_price * data[i].quantity;
                        let p = sales - cost;
                        income = income + sales;
                        profit = profit + p;
                    } else {
                        let sales = result[0].sales_price * data[i].quantity;
                        let p = result[0].profit * data[i].quantity;
                        income = income + sales;
                        profit = profit + p;
                    }
                }
                let final = {
                    "Income": income,
                    "Profit": profit,
                    "Users": customer_count,
                    "Orders": order_count
                }
                console.log(final);
                res.send(final);
            } else {
                res.send('No orders yet')
            }
        }
    })
});

//Add Promocode Admin
app.post('/AddCode', async(req, res) => {
    let promo = req.body.promocode;
    let discount = req.body.percentage;
    let customer_count = await Customer.count();
    let num = Math.ceil(customer_count / 10);
    let index = []
    let customer_arr = []
    for (let i = 0; i < num; i++) {
        let number = Math.floor(Math.random() * (customer_count));
        while (number in index) {
            number = Math.floor(Math.random() * (customer_count));
        }
        index.push(number);
    }
    console.log(index);
    Customer.find({}, (err, data) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < index.length; j++) {
                if (i == index[j]) {
                    customer_arr.push(data[i].username);
                }
            }
        }
        Discount.insertMany({
            percentage: discount,
            promocode: promo,
            customers: customer_arr
        }, (err, data) => {
            if (!err) {
                console.log("Hogya");
                console.log(data);
                res.send("Promocode Sent");
            } else {
                console.log("F");
                res.send("Something went wrong, please try again");
            }
        })
    })
});