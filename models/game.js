/*global require, exports*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({ game_id: Number }, { collection: 'boardgames_debug' });

gameSchema.statics.random = function (callback) {
    this.count(function (err, count) {
        if (err) {
            return callback(err);
        }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand).exec(callback);
    }.bind(this));
};

var Game = mongoose.model('Game', gameSchema);

exports.gameModel = Game;
