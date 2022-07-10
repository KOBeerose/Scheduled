let mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      requried: true
    },
    phone: {
      type: String,
      required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.get = function (callback, limit) {

   User.find(callback).limit(limit);

}
