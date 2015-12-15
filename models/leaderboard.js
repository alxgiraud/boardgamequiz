/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var leaderboardSchema = new Schema({
    username: String,
    score: Number,
    ip: String
}, {
    collection: 'tracking_debug'
});

leaderboardSchema.statics.getTopleaderboard = function (callback) {
    'use strict';
    var query = this.find().sort({ score: -1 }).limit(5);
    query.exec(callback);
};

var Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

exports.leaderboardModel = Leaderboard;
