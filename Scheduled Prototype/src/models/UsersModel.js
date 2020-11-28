//usersModel.js
var mongoose = require('mongoose');

//schema 
var usersSchema = mongoose.Schema({
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
    keywords: {
        type: Array,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Models
var User = module.exports = mongoose.model('users', usersSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}
