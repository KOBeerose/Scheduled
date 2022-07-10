let Room = require('../models/Room.js');
let Company = require('../models/Company.js');

exports.getDetails = async (req, res) => {

  let { companyID } = req.params;

  Company.findOne({ _id: companyID }).populate('rooms')
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

exports.findCompany = async (req, res) => {

  let { term } = req.query;
  console.log('Looking for ' + term);
  Company.find({ name: { $regex: term } }).populate('rooms')
  .then((companies) => {
    res.json({
      status: 'success',
      companies
    });
  })
  .catch((err) => {
    res.json(err);
  });
};
