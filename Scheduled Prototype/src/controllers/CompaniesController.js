//companiesController.js
//Import companies Model
Company = require('../models/companiesModel');
//For index
exports.index = function (req, res) {
    Company.get(function (err, companies) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "Success",
            message: "Got Companies Successfully!",
            data: companies
        });
    });
};
//For creating new companies
exports.add = function (req, res) {
    var companies = new Company();
    companies.name = req.body.name ? req.body.name : companies.name;
    companies.email = req.body.email;
    companies.phone = req.body.phone;
    companies.address = req.body.address;
    companies.password = req.body.password;
    companies.rooms_id = req.body.rooms_id;
    companies.details = req.body.details;
    //Save and check error
    companies.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New Company Added!",
            data: companies
        });
    });
};
// View companies
exports.view = function (req, res) {
    Company.findById(req.params.companies_id, function (err, companies) {
        if (err)
            res.send(err);
        res.json({
            message: 'Company Details',
            data: companies
        });
    });
};
// Update companies
exports.update = function (req, res) {
    Company.findById(req.params.companies_id, function (err, companies) {
        if (err)
            res.send(err);
        companies.name = req.body.name ? req.body.name : companies.name;
        companies.email = req.body.email;
        companies.phone = req.body.phone;
        companies.address = req.body.address;
        companies.password = req.body.password;
        companies.rooms_id = req.body.rooms_id;
        companies.details = req.body.details;
        //save and check errors
        companies.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Company Updated Successfully",
                data: companies
            });
        });
    });
};
// Delete companies
exports.delete = function (req, res) {
    Company.deleteOne({
        _id: req.params.companies_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "Success",
            message: 'Company Deleted'
        })
    })
}