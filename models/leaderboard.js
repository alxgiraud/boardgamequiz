/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var leaderboardSchema = new Schema({ username: String, score: Number, ip: String }, { collection: 'tracking_debug' });

var Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

exports.leaderboardModel = Leaderboard;
