/*global require, module*/
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

    app.post('/api/leaderboard/add', function (req, res) {
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
                return res.status(500).send(err.message);
            }

            res.json(records);
        });
    });

    app.get('/api/leaderboard/top', function (req, res) {
        Models.leaderboardModel.getTopleaderboard(function (err, records) {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(records);
        });
    });

    app.get('/api/leaderboard/personal', function (req, res) {
        var username = req.query.username,
            score = parseInt(req.query.score, 10),
            errMsg = 'Invalid parameters: username: "' + req.query.username + '", score: "' + req.query.score + '"';

        if (isNaN(score) || typeof username === 'undefined') {
            return res.status(500).send(errMsg);
        }

        Models.leaderboardModel.find().sort({score: -1}).lean().exec(function (err, records) {
            if (err) {
                return res.status(500).send(err.message);
            }

            var i, l = records.length,
                leaderboard = [],
                rank,
                getPerformanceWithRank = function (performance, rank, topPercentage) {
                    if (typeof performance === 'undefined') {
                        return null;
                    }

                    return {
                        rank: rank,
                        username: performance.username,
                        score: performance.score,
                        topPercentage: topPercentage
                    };
                },
                lowerRank,
                higherRank,
                lengthLearboard = (records.length > 5) ? 5 : records.length,
                lowerPerf,
                higherPerf;


            for (i = 0; i < l; i += 1) {
                if (records[i].username === username && records[i].score === score) {
                    rank = i + 1;
                    leaderboard.push(getPerformanceWithRank(records[i], rank, rank * 100 / records.length));

                    lowerRank = rank;
                    higherRank = rank;

                    while (leaderboard.length < lengthLearboard) {
                        lowerRank -= 1;
                        lowerPerf = getPerformanceWithRank(records[lowerRank - 1], lowerRank);
                        if (lowerPerf !== null) {
                            leaderboard.unshift(lowerPerf);
                        }

                        higherRank += 1;
                        higherPerf = getPerformanceWithRank(records[higherRank - 1], higherRank);
                        if (higherPerf !== null) {
                            leaderboard.push(higherPerf);
                        }
                    }

                    break;
                }
            }
            return res.json(leaderboard);
        });
    });
};
