// External Dependancies
const boom = require('boom');

// Get Data Models
const Customer = require('../models/Customer');

// Get all customers
exports.getCustomers = async (req, reply) => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single customer by ID
exports.getSingleCustomer = async (req, reply) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);
        return customer;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add a new customer
exports.addCustomer = async (req, reply) => {
    try {
        const customer = new Customer(req.body);
        return customer.save();
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Update an existing customer
exports.updateCustomer = async (req, reply) => {
    try {
        const id = req.params.id;
        const customer = req.body;
        const { ...updateData } = customer;
        const update = await Customer.findByIdAndUpdate(id, updateData, { new: true });
        return update;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Delete a customer
exports.deleteCustomer = async (req, reply) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByIdAndRemove(id);
        return customer;
    } catch (err) {
        throw boom.boomify(err);
    }
};

const csv = require('fast-csv');
const fs = require('fs');
const url = "mongodb://root:hackerman@localhost:27017/admin";
const mongoose = require('mongoose');
const streamToIterator = require('stream-to-iterator');

exports.importCustomerCsvToDb = async function(req, reply) {
    csv
    .parseFile(__dirname + '/' + 'data.csv', {headers: true})
    .on("data", data => {
        console.log(data);
        //Removes spaces from property value in-case it does have
        for (var key in data) {
            data[key] = data[key].trim();
        }
        //Create a customer Object and assign all values for it to save in database
        const customer = new Customer({
            name: data['Name'],
            pickupLat: data['Pick Up Lat'],
            pickupLong: data['Pick Up Long'],
            dropOffLat: data['Drop Off Lat'],
            dropOffLong: data['Drop Off Long']
        });
        //save in database
        customer.save(function (err) {
            if (err) {
                console.log("There is an error in processing customer data: " + err);
                throw boom.boomify(err);
            } else {
                console.log("Customer data has been saved: " + data);
            }
        })
    })
    .on("error", function (error) {
        console.log("There is an error in processing: " + error);
        throw boom.boomify(error)
    })
    .on("end", function () {
        console.log("done");
    });
    return reply.status(200).send({success: "Completed Successfully"});

};

// csv
//     .parseFile(__dirname + '/' + 'data.csv', {headers: true})
//     .on("data", data => {
//         console.log(data);
//         //Removes spaces from property value in-case it does have
//         for (var key in data) {
//             data[key] = data[key].trim();
//         }
//         //Create a customer Object and assign all values for it to save in database
//         const customer = new Customer({
//             name: data['Name'],
//             pickupLat: data['Pick Up Lat'],
//             pickupLong: data['Pick Up Long'],
//             dropOffLat: data['Drop Off Lat'],
//             dropOffLong: data['Drop Off Long']
//         });
//         //save in database
//         customer.save(function (err) {
//             if (err) {
//                 console.log("There is an error in processing customer data: " + err);
//                 throw boom.boomify(err);
//             } else {
//                 console.log("Customer data has been saved: " + data);
//             }
//         })
//     })
//     .on("error", function (error) {
//         console.log("There is an error in processing: " + error);
//         throw boom.boomify(error)
//     })
//     .on("end", function () {
//         console.log("done");
//     });
// return reply.status(200).send({success: "Completed Successfully"});



// try {
//     const conn = await mongoose.connect(uri);
//
//     await Promise.all(Object.entries(conn.models).map(([k,m]) => m.remove()));
//
//     let headers = Object.keys(Customer.schema.paths)
//         .filter(k => ['_id','__v'].indexOf(k) === -1);
//
//     console.log(headers);
//
//     let stream = fs.createReadStream(__dirname + '/' + 'data.csv')
//         .pipe(csv.parse({headers}));
//
//
//     const iterator = await streamToIterator(stream).init();
//
//     let buffer = [],
//         counter = 0;
//
//     for ( let docPromise of iterator ) {
//         let doc = await docPromise;
//         buffer.push(doc);
//         counter++;
//
//         if ( counter > 60000 ) {
//             await Customer.insertMany(buffer);
//             buffer = [];
//             counter = 0;
//         }
//     }
//
//     if ( counter > 0 ) {
//         await Customer.insertMany(buffer);
//         buffer = [];
//         counter = 0;
//     }
//
// } catch(e) {
//     console.error(e)
// } finally {
//     process.exit()
// }
