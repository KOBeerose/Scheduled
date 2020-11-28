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
//For creating new room
exports.add = function (req, res) {
    var rooms = new Room();
    rooms.name = req.body.name ? req.body.name : rooms.name;
    rooms.type = req.body.type;
    rooms.status = req.body.status;
    rooms.password = req.body.password;
    rooms.waiters_id = req.body.waiters_id;
    rooms.room_code = req.body.room_code;
    rooms.company_id = req.body.company_id;
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
    Room.findById(req.params.room_id, function (err, rooms) {
        if (err)
            res.send(err);
        res.json({
            message: 'Room Details',
            data: rooms
        });
    });
};
// view room status and number in q 
exports.viewdetails = function (req, res) {
    Room.find('rome_code' = rooms.room_code, function (err, rooms) {
        if (err)
            res.send(err);
        res.json({
            message: "name: " + rooms.name + " status: " + rooms.status + " your position in queue is " + (rooms.waiters_id).length,
        });
    });
};
// Update a room
exports.update = function (req, res) {
    Room.findById(req.params.room_id, function (err, rooms) {
        if (err)
            res.send(err);
        rooms.name = req.body.name ? req.body.name : rooms.name;
        rooms.type = req.body.type;
        rooms.status = req.body.status;
        rooms.password = req.body.password;
        rooms.waiters_id = req.body.waiters_id;
        rooms.room_code = req.body.room_code;
        rooms.company_id = req.body.company_id;
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
        _id: req.params.room_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "Success",
            message: 'Room Deleted'
        })
    })
}