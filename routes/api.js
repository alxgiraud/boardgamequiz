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
};
