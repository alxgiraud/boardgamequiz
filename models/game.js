/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var gameSchema = new Schema({ game_id: Number }, { collection: 'boardgames_debug' });

gameSchema.statics.getThreeRandomGames = function (callback) {
    'use strict';

    var queryRandOne = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(1),
        queryRandTwo = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(1),
        queryRandThree = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(1);
    
    async.parallel([
        function (callback) {
            queryRandOne.exec(function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        },
        function (callback) {
            queryRandTwo.exec(function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        },
        function (callback) {
            queryRandThree.exec(function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        }
    ], function (err, results) {
        if (err) {
            return callback(err);
        }
        var r = [],
            i,
            customError = { message: 'Oh that\'s bad. That\'s very extremely not good.'};

        for (i = 0; i < results.length; i += 1) {
            if (typeof results[i][0] === 'undefined') {
                return callback(customError);
            }
            r.push(results[i][0]);
        }
        callback(null, r);
    });
};

var Game = mongoose.model('Game', gameSchema);

exports.gameModel = Game;
