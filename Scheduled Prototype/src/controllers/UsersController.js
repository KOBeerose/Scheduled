//usersController.js
//Import users Model
User = require('../models/usersModel');
//For index
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "Success",
            message: "Got Users Successfully!",
            data: users
        });
    });
};
//For creating new users
exports.add = function (req, res) {
    var users = new User();
    users.name = req.body.name ? req.body.name : users.name;
    users.email = req.body.email;
    users.phone = req.body.phone;
    users.address = req.body.address;
    users.password = req.body.password;
    users.keywords = req.body.keywords;
    //Save and check error
    users.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New User Added!",
            data: users
        });
    });
};
// View users
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, users) {
        if (err)
            res.send(err);
        res.json({
            message: 'User Details',
            data: users
        });
    });
};
// Update users
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, users) {
        if (err)
            res.send(err);
        users.name = req.body.name ? req.body.name : users.name;
        users.email = req.body.email;
        users.phone = req.body.phone;
        users.address = req.body.address;
        users.password = req.body.password;
        users.keywords = req.body.keywords;
        //save and check errors
        users.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "User Updated Successfully",
                data: users
            });
        });
    });
};
// Delete users
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "Success",
            message: 'User Deleted'
        })
    })
}