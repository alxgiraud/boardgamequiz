/*global require, module, __dirname*/
module.exports = function (app) {
    'use strict';
    var Models = require('../models/index');

    app.get('/api/games/random', function (req, res) {
        Models.gameModel.getThreeRandomGames(function (err, records) {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.json(records);
        });
    });

    app.post('/api/score/save', function (req, res) {
        var score = {
            username: req.body.username,
            score: req.body.score,
            ip: req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress
        };

        Models.leaderboardModel.collection.insert(score, function (err, records) {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(records);
        });
    });
};
