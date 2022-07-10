let router = require('express').Router(),
companyController = require('./controllers/companyController.js'),
roomController = require('./controllers/roomController.js');

router.get('/', function(req, res) {
    res.json({
        status: 'success',
        message: ''
    });
});

router.put('/room/:roomCode', roomController.addUserToRoom);
router.delete('/room/:roomCode', roomController.removeUserFromRoom);
router.get('/room/:roomCode', roomController.getDetails);
router.get('/search', companyController.findCompany);
router.get('/company/:companyID', companyController.getDetails);
router.post('/company/:companyID', roomController.createRoom);


module.exports = router;
