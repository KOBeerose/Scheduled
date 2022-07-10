let Room = require('../models/Room.js'),
Company = require('../models/Company.js'),
User = require('../models/User.js'),
schedule = require('node-schedule'),
sendMessage = require('../SMS.js'),
moment = require('moment');


exports.getDetails = (req, res) => {

  let { roomCode } = req.params;



  Room.findOne({ _id: roomCode })
  .then((room) => {
    let result = {};
    if (req.cookies.userID && room.people.indexOf(req.cookies.userID) != -1) {
      result.position = room.people.indexOf(req.cookies.userID) + 1;
      result.timeLeft = (result.position - 1) * room.time;
    }
    Company.findOne({ _id: room.company })
    .then((company) => {
      result.company = company.name;
      res.json({
        status: 'success',
        room: {_id: room._id, name: room.name, size: room.size, time: room.time, people: room.people.length, ...result}
      })
    });

  })
  .catch((err) => {
    res.json(err);
  });

};

exports.createRoom = async (req, res) => {

  let { companyID } = req.params;

  Room.create(req.body)
  .then((room) => {
    return Company.findOneAndUpdate({ _id: companyID }, {$push: {rooms: room._id}}, { new: true });
  })
  .then((company) => {
    res.json({
      status: 'success',
      company
    });
  })
  .catch((err) => {
    res.json(err);
  });

};

exports.addUserToRoom = (req, res) => {

  let { roomCode } = req.params;

  if (req.cookies.userID) {
    Room.findOneAndUpdate({ _id: roomCode }, {$addToSet: {people: req.cookies.userID}}, { new: true })
    .then((room) => {
      // Schedule SMS
      let timeLeft = room.people.indexOf(req.cookies.userID) * room.time;
      let newdate = moment().add(timeLeft, 'm').toDate();
      User.findOne({ _id: req.cookies.userID })
      .then((user) => {
        scheduleMessage(user.phone, 'Votre tour dans ' + room.name + ' approche. Veuillez vous diriger vers la salle.', newdate);
        res.json({
          status: 'success',
          room
        });
      });

    })
    .catch((err) => {
      res.json(err);
    });
    return;
  }

  User.create(req.body)
  .then((user) => {
    res.cookie('userID', user._id,
    {
      maxAge: 24 * 60 * 60 * 365,
      secure: process.env.NODE_ENV === 'production'? true: false
    });
    return Room.findOneAndUpdate({ _id: roomCode }, {$addToSet: {people: user._id}}, { new: true });
  })
  .then((room) => {
    // Schedule SMS
    scheduleMessage(req.body.phone, 'Votre tour dans ' + room.name + ' approche. Veuillez vous diriger vers la salle.', newdate);
    res.json({
      status: 'success',
      room
    });
  })
  .catch((err) => {
    res.json(err);
  });

};

exports.removeUserFromRoom = (req, res) => {

  let { roomCode } = req.params;

  if (req.cookies.userID) {
    removeUser(roomCode, req.cookies.userID)
    .then((room) => {
      res.json({
        status: 'success',
        room
      });
    })
    .catch((err) => {
      res.json(err);
    });
    return;
  }

  res.status(403).json({
    status: 'failure',
    message: 'No user found'
  });


};

let removeUser = (roomId, userId) => {
  return Room.findOne({ _id: roomId })
  .then((room) => {
    room.people.pull(userId);
    return room.save();
  });
}

let scheduleMessage = (to, message, date) => {
  console.log('Scheduling a message to ' + formatNumber(to));
  schedule.scheduleJob(date, () => {
    console.log('Sending message to ' + formatNumber(to));
    sendMessage(formatNumber(to), message);
  });
}

let formatNumber = (number) => {
  if (number[0] == '+') return number;
  return '+212' + number.slice(1, number.length);
}
