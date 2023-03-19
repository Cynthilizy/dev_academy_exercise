const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");

// body-parser module is used to parse body in http requests to js objects
var bodyParser = require('body-parser');

// we'll use controller to routes to controller that handles spesific routes
var controller = require('./controller');

// these must be required also
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
// 80 is default html port, 243 for https.
// You can also use environment variables to define port
// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
const port = process.env.PORT || 3070;

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // If we want to enable CRUD-methods
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next(); // not sure what this does. It was required
}
// Enable CORS rules:
app.use(allowCrossDomain);

// enable body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));


app.route('/trip/:id')
    .get(controller.fetchSingleTrip)
    .put(controller.updateTrip)
    .delete(controller.deleteTrip);

app.route('/trip')
   .get(controller.fetchTrip)
    .post(controller.addNewTrip);

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});