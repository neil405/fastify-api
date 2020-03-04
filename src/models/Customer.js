// External Dependencies
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    pickupLat: Number,
    pickupLong: Number,
    dropOffLat: Number,
    dropOffLong: Number
});

module.exports = mongoose.model('Customer', customerSchema);