//roomsModel.js
var mongoose = require('mongoose');

//schema 
var roomsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    waiters_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Models
var Room = module.exports = mongoose.model('rooms', roomsSchema);
module.exports.get = function (callback, limit) {
    Room.find(callback).limit(limit);
}
