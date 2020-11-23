//roomsController.js
//Import rooms Model
Room = require('../models/roomsModel');
//For index
exports.index = function (req, res) {
    Room.get(function (err, rooms) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "Success",
            message: "Got Rooms Successfully!",
            data: rooms
        });
    });
};
//For creating new rooms
exports.add = function (req, res) {
    var rooms = new Room();
    rooms.name = req.body.name ? req.body.name : rooms.name;
    rooms.type = req.body.type;
    rooms.status = req.body.status;
    rooms.password = req.body.password;
    rooms.waiters_id = req.body.waiters_id;
    //Save and check error
    rooms.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New Room Added!",
            data: rooms
        });
    });
};
// View rooms
exports.view = function (req, res) {
    Room.findById(req.params.rooms_id, function (err, rooms) {
        if (err)
            res.send(err);
        res.json({
            message: 'Room Details',
            data: rooms
        });
    });
};
// Update rooms
exports.update = function (req, res) {
    Room.findById(req.params.rooms_id, function (err, rooms) {
        if (err)
            res.send(err);
        rooms.name = req.body.name ? req.body.name : rooms.name;
        rooms.email = req.body.email;
        rooms.phone = req.body.phone;
        rooms.address = req.body.address;
        rooms.password = req.body.password;
        rooms.room_id = req.body.room_id;
        rooms.keywords = req.body.keywords;
        //save and check errors
        rooms.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Room Updated Successfully",
                data: rooms
            });
        });
    });
};
// Delete rooms
exports.delete = function (req, res) {
    Room.deleteOne({
        _id: req.params.rooms_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "Success",
            message: 'Room Deleted'
        })
    })
}