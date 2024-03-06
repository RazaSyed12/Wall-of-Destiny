// function storeUser(...params){
//     // console.log(params);
//     return params;
// }

// console.log (storeUser('a','b','c'));

// create object instead of function

let user_data = {};
user_data.username = "hello";
user_data.name = 'x';
user_data.address = 'x';
user_data.contact = 's';
user_data.password = "nice";
user_data.email = 's';

console.log(user_data);
delete user_data.username;
delete user_data.name;
delete user_data.address;
delete user_data.contact;
delete user_data.password;
delete user_data.email;
console.log(user_data);