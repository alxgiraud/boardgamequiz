/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', '$interval', '$timeout', 'quizServices', function ($scope, $interval, $timeout, quizServices) {

        var choicesEnabled = false,
            quizNumber = 0,
            countdown,
            quizzHelper = {
                //Get game data and init the question
                getGames: function () {
                    quizServices.getGames().then(function (result) {
                        var games = result.data;
                        $scope.winningGame = games[Math.floor(Math.random() * games.length)];
                        $scope.choices = quizServices.convertGamesToChoices(games);

                        quizzHelper.initUI();

                    }, function (error) {
                        $scope.error = 'Oups! An error occurred while retrieving the games.';
                    });
                },

                // Manage the countdown, quiz number and choice overlays
                initUI: function () {
                    quizNumber += 1;
                    $scope.quizNumber = quizNumber;

                    $scope.counter = 150;
                    countdown = $interval(quizzHelper.decreaseCountdown, 100);

                    choicesEnabled = true;
                    $scope.classOverlay = [null, null, null];
                },

                // Countdown management
                decreaseCountdown: function () {
                    if ($scope.counter > 0) {
                        $scope.counter -= 1;
                    } else {
                        quizzHelper.endQuestion(0);
                    }
                },

                // Stop the countdown
                stopCountdown: function () {
                    if (angular.isDefined(countdown)) {
                        $interval.cancel(countdown);
                        countdown = undefined;
                    }
                },

                // Manager the choice of the player
                handleClickOnChoice: function (id, gameId) {
                    if (choicesEnabled) {
                        choicesEnabled = false;
                        quizzHelper.stopCountdown();

                        if (gameId === $scope.winningGame.game_id) {
                            $scope.classOverlay[id] = 'overlay-correct';
                            $scope.score += 10 + Math.ceil($scope.counter / 10);

                        } else {
                            var i;
                            $scope.classOverlay[id] = 'overlay-wrong';
                            for (i = 0; i < $scope.choices.length; i += 1) {
                                if ($scope.choices[i].gameId === $scope.winningGame.game_id) {
                                    $scope.classOverlay[i] = 'overlay-correct';
                                }
                            }
                        }

                        $timeout(function () {
                            if (quizNumber < 10) {
                                quizzHelper.getGames();
                            } else {
                                console.log("GAME OVER"); //TODO: Game Over
                            }
                        }, 1000);
                    }

                }
            };

        $scope.score = 0;
        quizzHelper.getGames();

        $scope.selectGame = function (id, gameId) {
            quizzHelper.handleClickOnChoice(id, gameId);
        };
    }]);
});
