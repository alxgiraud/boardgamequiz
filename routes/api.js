/*global require, module, __dirname*/
module.exports = function (app) {
    'use strict';
    var Models = require('../models/index');

    app.get('/api/games/random', function (req, res) {
        Models.gameModel.random(function (err, records) {
            if (err) {
                return res.send(err);
            }
            res.json(records);
        });

    });

    app.get('/api/games/:id', function (req, res) {
        Models.gameModel.find({ game_id: req.params.id }, function (err, records) {
            if (err) {
                return res.send(err);
            }
            res.json(records);
        });
    });
};
