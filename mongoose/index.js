/*global require, console*/
var mongoose = require('mongoose'),
    config = require('../config/database');

mongoose.connect(config.url, function (err) {
    'use strict';
    if (err) {
        console.error('Connection error');
        console.error(err);
    }
});
