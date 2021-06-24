//index.js
let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

//import body parser
var bodyParser = require('body-parser');
//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Import routes
var apiRoutes = require("./routes")
//Use API routes in the App
app.use('/api', apiRoutes)

// Welcome message
app.get('/', (req, res) => res.send('Taha le codeur'));
// Launch app to the specified port
app.listen(port, function () {
    console.log("Running FirstRest on Port number: " + port);
})


//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://localhost/firstrest';
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
