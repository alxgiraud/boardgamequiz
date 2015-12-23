/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var gameSchema = new Schema({ game_id: Number }, { collection: 'boardgames_debug' });

gameSchema.statics.getThreeRandomGames = function (callback) {
    'use strict';

    var queryRandOne = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(1),
        queryRandTwo = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(2),
        queryRandThree = this.find({ rand: { $gt: Math.random() }, 'statistics.owned': { $gt: 2000 }}).sort({ rand: 1 }).limit(3),
        helpers = {
            getGames: function (results) {
                var games = [];

                if (results[0][0].game_id) {
                    games.push(results[0][0]);
                }

                if (results[1][0].game_id) {
                    if (helpers.isDuplicate(results[1][0], games) && results[1][1].game_id) {
                        games.push(results[1][1]);
                    } else {
                        games.push(results[1][0]);
                    }
                }

                if (results[2][0].game_id) {
                    if (helpers.isDuplicate(results[2][0], games) && results[2][0].game_id) {
                        if (results[2][1].game_id) {
                            if (helpers.isDuplicate(results[2][1], games) && results[2][2].game_id) {
                                games.push(results[2][2]);
                            } else {
                                games.push(results[2][1]);
                            }
                        }
                    } else {
                        games.push(results[2][0]);
                    }
                }

                return (games.length === 3) ? games : undefined;
            },
            isDuplicate: function (game, games) {
                var i, l = games.length;
                for (i = 0; i < l; i += 1) {
                    if (game.game_id === games[i].game_id) {
                        return true;
                    }
                }
                return false;
            }
        };
    
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
        
        var games = helpers.getGames(results),
            customError = { message: 'Oh that\'s bad. That\'s very extremely not good.' };
        
        if (typeof games === 'undefined') {
            return callback(customError);
        }
        
        callback(null, games);
    });
};

var Game = mongoose.model('Game', gameSchema);

exports.gameModel = Game;
