const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const pbkdf2 = require('pbkdf2');
const Customer = require('./Models/customers');
const Admin = require('./Models/admin');
const Product = require('./Models/products');
const Discount = require('./Models/discount');
const Cart = require('./Models/cart');
const Order = require('./Models/order');
const generateString = require('./helperFunctions');
const cors = require('cors');
const nodemailer = require("nodemailer");
// const { WrongLocation } = require('@mui/icons-material');


const app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
}

const dbURI = 'mongodb+srv://muhammadraza1292:Eo3L9yHGW1B5ZOvD@cluster0.kjgf5le.mongodb.net/WOD?retryWrites=true&w=majority';

const server = app.listen(8000, () => {
    console.log("App is running on port:", 8000);
});

// Database connecting to Backend Server
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Successfully connected to Database"))
    .catch((err) => console.log(err));

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(8000, () => {console.log("App is running")}))
//     .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));


// CUSTOMER USE CASES

let user_data = {};
let randomstring = '';
//Spin the wheel Promocodes
let discount_codes = {
    "YSIND": 25,
    "TUFND": 20,
    "ABCDE": 20,
    "FTYWI": 15,
    "YDIEB": 15,
    "GYDIE": 10
};

app.post('/testing', async(req, res) => {
    try {
        let query = Customer.find()
        let data = await query
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

// Customer's Signup
app.post('/signup_further', (req, res) => {
    if (req.body.pin == randomstring) {
        // res.send("Success");
    } else {
        res.send("Failure");
    }
})


app.post('/signup', async(req, res) => {
    // handle username and email not repeat

    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined" || typeof req.body.name === "undefined" || typeof req.body.contact === "undefined" || typeof req.body.address === "undefined" || typeof req.body.email === "undefined") {
        res.send("Please fill all spaces");
        return;
    }
    // add email check
    if (req.body.email.slice(-10) == '@gmail.com' || req.body.email.slice(-10) == '@yahoo.com') {

        if (req.body.password.length <= 5) {
            res.send("Password should be greater than 5 characters");
            return;
        }

        Customer.insertMany({
            username: req.body.username,
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }, (err, data) => {
            if (!err) {

                delete user_data.username;
                delete user_data.name;
                delete user_data.address;
                delete user_data.contact;
                delete user_data.password;
                delete user_data.email;

                console.log("SAVE HOGYA HAI");
                console.log(data);
                res.send("SAVE HOGYA HAI");
            } else {
                console.log("Error aggya hai");
                console.log(err);
                // username corner case handle
                res.send("Username already taken");
            }
        })
    } else {
        res.send("Enter a valid email address. Only Gmail and Yahoo email accounts are valid");
        return;
    }
});



// Customer's Login
app.post('/login', (req, res) => {
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
        res.send("Please fill all spaces");
        return;
    }


    Customer.find({ username: req.body.username, password: req.body.password }, (err, data) => {
        if (!err) {
            if (data.length >= 1) {
                console.log("USER HAS BEEN FOUND");
                res.send("USER HAS BEEN FOUND");
            } else if (data.length == 0) {
                console.log("USER NOT FOUND");
                res.send("Incorrect Username or Password");
                return;
            }
        } else {
            console.log(err);
            res.send("Error");
        }


    });

});


app.post('/loginAdmin', (req, res) => {

    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
        res.send("Please fill all spaces");
        return;
    }

    Admin.find({ username: req.body.username, password: req.body.password }, (err, data) => {

        if (!err) {
            if (data.length >= 1) {
                console.log("USER HAS BEEN FOUND");
                res.send("In kara isko");
            } else if (data.length == 0) {
                console.log("USER NOT FOUND");
                res.send("Incorrect Username or Password");
                return;
            }
        } else {
            console.log(err);
            res.send("Error");
        }
    });

});



// landing page (Showing featured Products)
app.get('/', (req, res) => {

    Product.find({ featured: "1" }, (err, data) => {
        res.send(data);
    });
});



// home page (Showing All Products)
app.get('/adminHome', (req, res) => {

    Product.find((err, data) => {
        res.send(data);
    });

});

app.get('/home', (req, res) => {

    Product.find({ featured: "Yes" }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


// Endpoint to get products by category
app.get('/product_category', (req, res) => {
    const category = req.query.category;

    Product.find({ category: category }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});



// customer's profile
app.post('/customer_profile', (req, res) => {

    Customer.find({ username: req.body.username }, (err, data) => {
        res.send(data[0]);
    });

});



// category products
// app.post('/product_category', (req, res) => {

//     Product.find({ category: req.body.category }, (err, data) => {
//         console.log(data);
//         res.send(data);
//     });

// });



// search product
app.post('/search_product', (req, res) => {

    Product.find({ name: req.body.name }, (err, data) => {
        res.send(data);
        if (data.length == 0) {
            // we can redirect it to the same page as well
            res.send("No Product Found");
            return;
        } else {
            res.send(data);
        }
    });
});



// Update customer info (change username, password, etc)

// app.post('/update_customer_info', (req, res) => {
//     // req.body will be an object

//     if (req.body.password == "password"){
//         Customer.updateMany({username: req.body.username}, {$set: {name: req.body.name, address: req.body.address, contact: req.body.contact}}, (err,data) => {
//             if (!err){
//                 res.send("Success");
//             }
//             else{
//                 res.send("Error");
//             }

//         });
//     }
//     else{ 

//     if (req.body.password.length <= 5){
//         res.send("Password should be greater than 5 characters");
//         return;
//     }

//     Customer.updateMany({username: req.body.username}, {$set: {name: req.body.name, address: req.body.address, contact: req.body.contact, password: pbkdf2.pbkdf2Sync(req.body.password, 'habibi', 1, 32, 'sha512')}}, (err,data) => {
//         if (!err){
//             res.send("Success");
//         }
//         else {
//             res.send("Error");
//         }

//     });
// }

// });

app.post('/update_customer_info', (req, res) => {
    // req.body will be an object
    console.log(req.body)
    if (req.body.password.length <= 5) {
        res.send("Password is too short");
        return;
    }

    if (req.body.address !== "") {
        Customer.updateMany({ username: req.body.username }, { $set: { address: req.body.address } }, (err, data) => {
            if (!err) {
                // res.send("Success");
                console.log("Address is updated");
            } else {
                res.send("Error");
            }

        });
    }

    if (req.body.contact !== "") {
        Customer.updateMany({ username: req.body.username }, { $set: { contact: req.body.contact } }, (err, data) => {
            if (!err) {
                // res.send("Success");
                console.log("Contact is updated");
            } else {
                res.send("Error");
            }

        });
    }

    if (req.body.name !== "") {
        Customer.updateMany({ username: req.body.username }, { $set: { name: req.body.name } }, (err, data) => {
            if (!err) {
                // res.send("Success");
                console.log("Name is updated");
            } else {
                res.send("Error");
            }

        });
    }

    if (req.body.password !== "password") {

        Customer.updateMany({ username: req.body.username }, { $set: { password: req.body.password } }, (err, data) => {
            if (!err) {
                console.log("Password is updated");
                res.send("Success");
            } else {
                res.send("Error");
            }

        });
    }
    // res.send ("Updated");
    return;

});



// Deactivate Customer Account
app.post('/deactivate_account', (req, res) => {

    Customer.deleteMany({ username: req.body.username }, (err, data) => {
        console.log("Account Deleted");
        res.send("Account Deleted");
    });

});


// ADMIN USE CASES


// Add a manager (Sort of a signup)
app.post('/signupAdmin', (req, res) => {
    // handle username and email not repeat

    console.log("This is the type of username " + typeof(req.body.username));

    if (req.body.username == "" || req.body.password == "" || typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
        res.send("Please fill all the spaces");
        return;
    }

    Admin.insertMany({
        username: req.body.username,
        password: req.body.password
    }, (err, data) => {
        if (!err) {
            console.log(data);
            res.send("Success");
        } else {
            console.log(err);
            res.send("Make sure username is unique");
        }
    })


});

// deactivate account (Admin)
app.post('/deactivate_account_admin', (req, res) => {

    Admin.deleteMany({ username: req.body.username }, (err, data) => {
        res.send("Account Deleted");
        console.log("Account Deleted");
    });

});



// change password
app.post('/update_admin_info', (req, res) => {
    // req.body will be an object

    Admin.updateMany({ username: req.body.username }, { $set: { password: req.body.password } }, (err, data) => {
        if (req.body.password.length <= 5) {
            res.send("Password should be greater than 5 characters");
            return;
        }
        if (!err) {
            res.send("Success");
        } else {
            res.send("Failed. Try Again");
        }
    });

});



// Add product (Admin)
app.post('/addproduct', (req, res) => {
    // handle username and email not repeat

    if (typeof req.body.name === "undefined" || typeof req.body.pic === "undefined" || typeof req.body.cost_price === "undefined" || typeof req.body.sales_price === "undefined" || typeof req.body.details === "undefined" || typeof req.body.color === "undefined" || typeof req.body.dimensions === "undefined" || typeof req.body.category === "undefined" || typeof req.body.featured === "undefined") {
        res.send("Please fill all spaces");
        return;
    }

    console.log(req.body)
    Product.insertMany({
        name: req.body.name,
        pic: req.body.pic,
        cost_price: req.body.cost_price,
        sales_price: req.body.sales_price,
        profit: req.body.sales_price - req.body.cost_price,
        details: req.body.details,
        color: req.body.color,
        dimensions: req.body.dimensions,
        category: req.body.category,
        featured: req.body.featured
    }, (err, data) => {

        if (!err) {
            console.log("SAVE HOGYA HAI");
            console.log(data);
            res.send("Success");
        } else {
            console.log("Error aggya hai");
            console.log(err);
            res.send("Make sure format for fields is right");
        }
    })


});

// Edit Product (Admin)
// app.post('/editproduct', (req, res) => {

//     // handle case where cost_price might contain letters

//     Product.updateMany({ name: req.body.name }, {
//         $set: {
//             pic: req.body.pic,
//             cost_price: req.body.cost_price,
//             sales_price: req.body.sales_price,
//             profit: req.body.sales_price - req.body.cost_price,
//             details: req.body.details,
//             color: req.body.color,
//             dimensions: req.body.dimensions,
//             category: req.body.category,
//             featured: req.body.featured
//         }
//     }, (err, data) => {

//         if (!err) {
//             res.send(data);
//         } else {
//             res.send("Make sure the formaat is right for all fields");
//         }
//     });

// });

app.patch('/editproduct/:id', (req, res) => {
    const productId = req.params.id;

    let updateObject = {};

    // Add fields to updateObject only if they are provided in the request body
    if (req.body.name) updateObject.name = req.body.name;
    if (req.body.pic) updateObject.pic = req.body.pic;
    if (req.body.cost_price) updateObject.cost_price = req.body.cost_price;
    if (req.body.sales_price) updateObject.sales_price = req.body.sales_price;
    if (req.body.details) updateObject.details = req.body.details;
    if (req.body.color) updateObject.color = req.body.color;
    if (req.body.dimensions) updateObject.dimensions = req.body.dimensions;
    if (req.body.category) updateObject.category = req.body.category;
    if (req.body.featured) updateObject.featured = req.body.featured;

    // Calculate profit only if cost_price and sales_price are both provided
    if (req.body.cost_price && req.body.sales_price) {
        updateObject.profit = req.body.sales_price - req.body.cost_price;
    }

    Product.findByIdAndUpdate(productId, updateObject, { new: true }, (err, data) => {
        if (!err) {
            console.log("Product Updated");
            console.log(data);
            res.send("Update Success");
        } else {
            console.log("Error occurred");
            console.log(err);
            res.send("Error updating product");
        }
    });
});




// app.post('/editproduct', (req, res) => {

//     // handle case where cost_price might contain letters
//     let temp_cost_price = 0;
//     let temp_sales_price = 0;
//     if (req.body.cost_price === ""){
//         Product.find({name: req.body.name}, (err,data) =>{
//             // temp_cost_price = data[0].cost_price;
//             console.log(data[0].cost_price);
//             // console.log(temp_cost_price);

//             Product.updateMany({name: req.body.name}, {$set: {cost_price: data[0].cost_price}}, (err,data) => {
//                 if (!err){
//                     // res.send("Success");
//                     console.log(`Cost1 Price is updated`);
//                 }
//                 else {
//                     res.send("Error");
//                 }

//             });

//         });
//         // Product.updateMany({name: req.body.name}, {$set: {cost_price: temp_cost_price}}, (err,data) => {
//         //     if (!err){
//         //         // res.send("Success");
//         //         console.log("Cost Price is updated");
//         //     }
//         //     else {
//         //         res.send("Error");
//         //     }

//         // });
//     }
//     if (req.body.sales_price === ""){
//         Product.find({name: req.body.name}, (err,data) =>{
//             temp_sales_price = data[0].sales_price;
//             console.log(data[0].sales_price);

//         });
//         Product.updateMany({name: req.body.name}, {$set: {sales_price: temp_sales_price}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Cost Price is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }


//     if (req.body.pic !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {pic: req.body.pic}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Pic is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.cost_price !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {cost_price: req.body.cost_price}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Cost Price is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.sales_price !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {sales_price: req.body.sales_price}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Sales Price is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }


//     if (req.body.dimensions !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {dimensions: req.body.dimensions}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Dimensions is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.color !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {color: req.body.color}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Color is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.details !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {details: req.body.details}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Details is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.category !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {category: req.body.category}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Category is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     if (req.body.featured !== ""){
//         Product.updateMany({name: req.body.name}, {$set: {featured: req.body.featured}}, (err,data) => {
//             if (!err){
//                 // res.send("Success");
//                 console.log("Featured is updated");
//             }
//             else {
//                 res.send("Error");
//             }

//         });
//     }

//     Product.updateMany({name: req.body.name}, {$set: {profit: (req.body.sales_price - req.body.cost_price)}}, (err,data) => {
//         if (!err){
//             // res.send("Success");
//             console.log("Profit is updated");
//         }
//         else {
//             res.send("Error");
//         }

//     });

//     return;



// Product.updateMany({ name: req.body.name }, {
//     $set: {
//         pic: req.body.pic,
//         cost_price: req.body.cost_price,
//         sales_price: req.body.sales_price,
//         profit: req.body.profit,
//         details: req.body.details,
//         color: req.body.color,
//         dimensions: req.body.dimensions,
//         category: req.body.category,
//         featured: req.body.featured
//     }
// }, (err, data) => {

//     if (!err) {
//         res.send(data);
//     }
//     else {
//         res.send("Make sure the formaat is right for all fields");
//     }
// });

// });


// Delete Product (Admin)
app.post('/deleteproduct', (req, res) => {

    Product.deleteMany({ name: req.body.name }, (err, data) => {

        if (!err) {
            res.send("Product Deleted")
        } else {
            res.send("Error");
        }
    });

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

//Add to Cart
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

//Deleting Item Completely From Cart
app.post('/DeleteItem', async(req, res) => {
    let cust_username = req.body.username;
    let product_name = req.body.product_name;
    await Cart.deleteMany({ customer_username: cust_username, product_name: product_name });
    res.send("Item Deleted Successfully");
});

// View Cart
app.post('/ViewCart', (req, res) => {
    let cust_username = req.body.username;
    console.log(req.body.username)
    Cart.find({ customer_username: cust_username }, async (err, data) => {
        if (err) {
            console.log("F");
            console.log(err);
            res.send("Error");
        }
        else {
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

            }
            else {
                console.log("here")
                res.send("Cart is empty");
            }
        }
    })
});

//Payment Procedure
app.post('/Payment', async(req, res) => {
    let cust_username = req.body.username;
    let discount = (100 - (req.body.discount * 100));
    if (req.body.discount == 1) {
        discount = 0;
    }
    Cart.find({ customer_username: cust_username }, (err, data) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong, please try again");
        } else {
            for (let i = 0; i < data.length; i++) {
                let product_name = data[i].product_name;
                let quantity = data[i].quantity;
                Order.insertMany({
                    customer_username: cust_username,
                    product_name: product_name,
                    quantity: quantity,
                    status: "Processing",
                    discount: discount
                }, async(err, data) => {
                    if (!err) {
                        console.log("Hogya");
                        console.log(data);
                        await Cart.deleteMany({ customer_username: cust_username });
                    } else {
                        console.log("F");
                        res.send("Something went wrong, please try again");
                    }
                })
            }
            res.send("Order has been placed");
        }
    })
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

//View History
app.post('/History', (req, res) => {
    Order.find({ customer_username: req.body.username }, async(err, data) => {
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
    Order.find({ quantity: { $gte: 1 } }, async (err, data) => {
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

                    // Check if result is not empty
                    if (result && result.length > 0) {
                        if (data[i].discount != 0) {
                            let dis = (1 - (data[i].discount / 100));
                            let sales = result[0].sales_price * data[i].quantity * dis;
                            let cost = result[0].cost_price * data[i].quantity;
                            let p = sales - cost;
                            income += sales;
                            profit += p;
                        } else {
                            let sales = result[0].sales_price * data[i].quantity;
                            let p = result[0].profit * data[i].quantity;
                            income += sales;
                            profit += p;
                        }
                    } else {
                        // Handle the case when the product is not found
                        console.log(`Product not found: ${data[i].product_name}`);
                    }
                }

                let final = {
                    "Income": income,
                    "Profit": profit,
                    "Users": customer_count,
                    "Orders": order_count
                };
                console.log(final);
                res.send(final);
            } else {
                res.send('No orders yet');
            }
        }
    });
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

//Spin the Wheel
app.post('/SpinWheel', (req, res) => {
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