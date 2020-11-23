//routes.js
//initialize express router
let router = require('express').Router();
//set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API 7way',
        message: 'This API is Made by Anas'
    });
});

//Import users Controller
var usersController = require('./controllers/usersController');
// users routes
router.route('/users')
    .get(usersController.index)
    .post(usersController.add);
router.route('/users/:users_id')
    .get(usersController.view)
    .patch(usersController.update)
    .put(usersController.update)
    .delete(usersController.delete);
//Import rooms Controller
var roomsController = require('./controllers/roomsController');
// rooms routes
router.route('/rooms')
    .get(roomsController.index)
    .post(roomsController.add);
router.route('/rooms/:rooms_id')
    .get(roomsController.view)
    .patch(roomsController.update)
    .put(roomsController.update)
    .delete(roomsController.delete);
//Import companies Controller
var companiesController = require('./controllers/companiesController');
// companies routes
router.route('/companies')
    .get(companiesController.index)
    .post(companiesController.add);
router.route('/companies/:companies_id')
    .get(companiesController.view)
    .patch(companiesController.update)
    .put(companiesController.update)
    .delete(companiesController.delete);
//Export API routes
module.exports = router;