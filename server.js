const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");

var bodyParser = require('body-parser');
var controller = require('./controller');
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
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
    .delete(controller.deleteTrip);

app.route('/trip')
    .get(controller.fetchTrip)
    .post(controller.addNewTrip);

app.route('/station')
    .get(controller.fetchStation);

app.route('/station/:name')
    .get(controller.fetchSingleStation);

app.route('/name/:name')
    .get(controller.fetchStationDetails);

app.route('/name/:name/month/:month')
    .get(controller.getMonthlyData);

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});