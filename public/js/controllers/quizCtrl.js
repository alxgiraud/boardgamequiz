/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('QuizCtrl', ['$scope', '$interval', '$timeout', '$location', '$route', 'quizServices', 'GameConstants', '$uibModal',
        function ($scope, $interval, $timeout, $location, $route, quizServices, GameConstants, $uibModal) {
            var winningId,
                countdown,
                quizNumber = 0,
                choicesEnabled = false,
                quizHelper = {
                    // Get game data and init the question
                    getGames: function () {
                        quizServices.getGames().then(function (result) {
                            var games = result.data,
                                winningGame = games[Math.floor(Math.random() * games.length)];

                            if (winningGame.hasOwnProperty('game_id')) {
                                $scope.gameReady = true;
                                winningId = winningGame.game_id;
                                $scope.clues = quizServices.getRandomClues(winningGame);
                                $scope.choices = quizServices.convertGamesToChoices(games);
                                quizHelper.initUI();

                            } else {
                                $scope.error = 'Oups! The games retrieved contain an error.';

                            }
                        }, function (error) {
                            $scope.error = 'Oups! An error occurred while retrieving the games.';

                        });
                    },

                    // Manage the countdown, quiz number and choice overlays
                    initUI: function () {
                        quizNumber += 1;
                        $scope.quizNumber = quizNumber;
                        $scope.comboCounter = quizServices.getComboCounter();

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
                            choicesEnabled = false;
                            quizServices.resetCombo();
                            quizHelper.stopCountdown();
                            quizHelper.displayCorrectAnswer();
                            quizHelper.loadNextTurn();
                        }
                    },

                    // Search and display the correct answer to the user
                    displayCorrectAnswer: function () {
                        var i;
                        for (i = 0; i < $scope.choices.length; i += 1) {
                            if ($scope.choices[i].gameId === winningId) {
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
                                quizServices.saveFinalScore($scope.score).then(function () {
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

                            if (gameId === winningId) {
                                $scope.classOverlay[id] = 'overlay-correct';
                                $scope.score = quizServices.increaseScore($scope.counter);

                            } else {
                                quizServices.resetCombo();
                                $scope.classOverlay[id] = 'overlay-wrong';
                                quizHelper.displayCorrectAnswer();
                            }

                            quizHelper.loadNextTurn();
                        }
                    }
                };

            $scope.gamesPerRound = GameConstants.GAMES_PER_ROUND;
            $scope.maxCounter = GameConstants.COUNTDOWN * 10;
            $scope.score = quizServices.resetScore();
            $scope.comboCounter = quizServices.resetCombo();

            quizHelper.getGames();

            $scope.selectGame = function (id, gameId) {
                quizHelper.handleClickOnChoice(id, gameId);
            };

            $scope.open = function (size) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'resetModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    $route.reload();
                });
            };

        }]);
    app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        $scope.reset = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    });
});
