let mongoose = require('mongoose'),
Schema = mongoose.Schema,
Room = require('./Room.js');

var companySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    rooms: [{
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }]
});

companySchema.index({'$**': 'text'});

let Company = module.exports = mongoose.model('Company', companySchema);

module.exports.get = function (callback, limit) {

   Company.find(callback).limit(limit);

}
