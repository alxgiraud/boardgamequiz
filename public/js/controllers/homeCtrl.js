/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', '$interval', '$timeout', 'quizServices', function ($scope, $interval, $timeout, quizServices) {

        var quizNumber = 0,
            countdown,
            quizzHelper = {
                getGames: function () {
                    quizNumber += 1;
                    $scope.quizNumber = quizNumber;
                    quizServices.getGames().then(function (result) {
                        var games = result.data;

                        $scope.winningGame = games[Math.floor(Math.random() * games.length)];
                        $scope.choices = quizServices.convertGamesToChoices(games);
                        $scope.classChoice = null;

                        $scope.counter = 150;
                        countdown = $interval(quizzHelper.decreaseCountdown, 100);

                    }, function (error) {
                        $scope.error = 'Oups! An error occurred while retrieving the games.';
                    });
                },
                decreaseCountdown: function () {
                    if ($scope.counter > 0) {
                        $scope.counter -= 1;
                    } else {
                        quizzHelper.endQuestion(0);
                    }
                },
                endQuestion: function (win) {
                    quizzHelper.stopCountdown();
                    $scope.classChoice = 'choice-disabled';

                    if (win) {
                        console.log("WIN");
                    } else {
                        console.log("LOOSE");
                    }

                    $timeout(function () {
                        if (quizNumber < 10) {
                            quizzHelper.getGames();
                        } else {
                            console.log("GAME OVER");
                        }
                    }, 1000);
                },
                stopCountdown: function () {
                    if (angular.isDefined(countdown)) {
                        $interval.cancel(countdown);
                        countdown = undefined;
                    }
                },
                handleClickOnChoice: function (id) {
                    if ($scope.classChoice !== 'choice-disabled') {
                        quizzHelper.stopCountdown();
                        if (id === $scope.winningGame.game_id) {
                            $scope.score += 10 + Math.ceil($scope.counter / 10);

                            quizzHelper.endQuestion(1);

                        } else {
                            quizzHelper.endQuestion(0);
                        }
                    }
                }
            };

        $scope.score = 0;
        $scope.quizNumber = 1;

        quizzHelper.getGames();

        $scope.selectGame = function (id) {
            quizzHelper.handleClickOnChoice(id);
        };

    }]);
});
