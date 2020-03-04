// const csv = require("fast-csv");
// const Customer = require('../models/Customer');
// module.exports.customer = {
//     importCustomerData: function () {
//         csv
//             .parseFile(__dirname + '/' + 'data.csv', {headers: true})
//             .on("data", function (data) {
//                 console.log(data);
//                 //Removes spaces from property value in-case it does have
//                 for (var key in data) {
//                     data[key] = data[key].trim();
//                 }
//                 //Create a employee Object and assign all values for it to save in database
//                 const customer = new Customer({
//                     name: data['Name'],
//                     pickupLat: data['Pick Up Lat'],
//                     pickupLong: data['Pick Up Long'],
//                     dropOffLat: data['Drop Off Lat'],
//                     dropOffLong: data['Drop Off Long']
//                 });
//                 //save in database
//                 customer.save(function (err) {
//                     if (err) {
//                         console.log("There is an error in processing employee data: " + err);
//                     } else {
//                         console.log("Employee data has been saved: " + data);
//                     }
//                 })
//                 return 'Job Completed';
//             })
//             .on("error", function (error) {
//                 console.log("There is an error in processing: " + error);
//             })
//             .on("end", function () {
//                 console.log("done");
//             });
//
//     }
// };