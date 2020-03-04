// External Dependencies
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pickupLat: {type: String, required: true},
    pickupLong: {type: String, required: true},
    dropOffLat: {type: String, required: true},
    dropOffLong: {type: String, required: true}
});

module.exports = mongoose.model('Customer', customerSchema);