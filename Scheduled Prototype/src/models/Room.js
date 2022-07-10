let mongoose = require('mongoose'),
Schema = mongoose.Schema;

var roomSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
    },
    people: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});


let Room = module.exports = mongoose.model('Room', roomSchema);

module.exports.get = function (callback, limit) {

   Room.find(callback).limit(limit);

}
