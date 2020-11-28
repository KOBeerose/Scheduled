//usersModel.js
var mongoose = require('mongoose');

//schema 
var companiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Models
var Company = module.exports = mongoose.model('companies', companiesSchema);
module.exports.get = function (callback, limit) {
    Company.find(callback).limit(limit);
}