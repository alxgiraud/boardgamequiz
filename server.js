/*global require, console*/
var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


// configuration
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./mongoose');


// routes
require('./routes/web.js')(app);
require('./routes/api.js')(app);


app.listen(3000, function () {
    'use strict';
	console.log("Server is running on port 3000...");
});