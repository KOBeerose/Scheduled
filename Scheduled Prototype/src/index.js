let express = require('express'),
apiRoutes = require('./routes'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
mongoose = require('mongoose'),
cors = require('cors'),
app = express(),
sendMessage = require('./SMS.js'),
port = process.env.PORT || 8080;


app.use(cors({
  credentials: true,
  exposedHeaders: ['set-cookie'],
  origin: [
    'http://localhost:3000',
    'https://localhost:3000'
  ],
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', apiRoutes);

app.listen(port, function() {
    console.log("Running Scheduled on Port "+ port);
})

const dbPath = 'mongodb://127.0.0.1:27017/scheduled?compressors=zlib&gssapiServiceName=mongodb';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
