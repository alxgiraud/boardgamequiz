/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({ game_id: Number }, { collection: 'boardgames_debug' });

gameSchema.statics.random = function (callback) {
    'use strict';
    var games = this.find({ 'statistics.owned': { $gt: 2000 }}, function (err, result) {
        if (err) {
            callback(err);
        }
    });
    
    games.find({ rand: { $gt: Math.random() }}).sort({rand: 1}).limit(3).exec(callback);
};

var Game = mongoose.model('Game', gameSchema);

exports.gameModel = Game;
