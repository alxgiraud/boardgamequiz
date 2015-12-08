/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('QuizCtrl', ['$scope', '$interval', '$timeout', '$location', 'quizServices', 'GameConstants',
        function ($scope, $interval, $timeout, $location, quizServices, GameConstants) {
            var choicesEnabled = false,
                quizNumber = 0,
                countdown,
                quizHelper = {
                    //Get game data and init the question
                    getGames: function () {
                        quizServices.getGames().then(function (result) {
                            var games = result.data;
                            $scope.winningGame = games[Math.floor(Math.random() * games.length)];
                            $scope.choices = quizServices.convertGamesToChoices(games);

                            quizHelper.initUI();

                        }, function (error) {
                            $scope.error = 'Oups! An error occurred while retrieving the games.';
                        });
                    },

                    // Manage the countdown, quiz number and choice overlays
                    initUI: function () {
                        quizNumber += 1;
                        $scope.quizNumber = quizNumber;

                        $scope.counter = GameConstants.COUNTDOWN * 10;
                        countdown = $interval(quizHelper.decreaseCountdown, 100);

                        choicesEnabled = true;
                        $scope.classOverlay = [null, null, null];
                    },

                    // Countdown management
                    decreaseCountdown: function () {
                        if ($scope.counter > 0) {
                            $scope.counter -= 1;
                        } else {
                            quizHelper.stopCountdown();
                            quizHelper.displayCorrectAnswer();
                            quizHelper.loadNextTurn();
                        }
                    },

                    // Search and display the correct answer to the user
                    displayCorrectAnswer: function () {
                        var i;
                        for (i = 0; i < $scope.choices.length; i += 1) {
                            if ($scope.choices[i].gameId === $scope.winningGame.game_id) {
                                $scope.classOverlay[i] = 'overlay-correct';
                            }
                        }
                    },

                    // Load the next turn or call the end of the game
                    loadNextTurn: function () {
                        $timeout(function () {
                            if (quizNumber < GameConstants.GAMES_PER_ROUND) {
                                quizHelper.getGames();
                            } else {
                                quizServices.saveScore($scope.score).then(function () {
                                    $location.path('end');
                                }, function () {
                                    $scope.error = 'Oups! An error occurred while saving the score.';
                                });
                            }
                        }, GameConstants.DELAY_BEFORE_NEXT_TURN);
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
                            quizHelper.stopCountdown();

                            if (gameId === $scope.winningGame.game_id) {
                                $scope.classOverlay[id] = 'overlay-correct';
                                $scope.score += GameConstants.BASE_SCORE + Math.ceil($scope.counter * GameConstants.TIME_BONUS / 10);
                            } else {
                                $scope.classOverlay[id] = 'overlay-wrong';
                                quizHelper.displayCorrectAnswer();
                            }

                            quizHelper.loadNextTurn();
                        }
                    }
                };

            $scope.score = 0;
            quizHelper.getGames();

            $scope.selectGame = function (id, gameId) {
                quizHelper.handleClickOnChoice(id, gameId);
            };

        }]);
});
