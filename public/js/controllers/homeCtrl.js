/*global define*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', '$interval', 'quizServices', function ($scope, $interval, quizServices) {

        var quizNumber = 0,
            countdown,
            stopCountdown = function () {
                if (angular.isDefined(countdown)) {
                    $interval.cancel(countdown);
                    countdown = undefined;
                }
            },
            endQuestion = function (win) {
                stopCountdown();

                if (win) {
                    console.log("WIN");
                } else {
                    console.log("LOOSE");
                }

                getGames();
            },
            decreaseCountdown = function () {
                if ($scope.counter > 0) {
                    $scope.counter -= 1;
                } else {
                    endQuestion(0);
                }
            },
            getGames = function () {
                quizNumber += 1;
                if (quizNumber >= 10) {
                    //TODO: End of the round!
                }
                $scope.quizNumber = quizNumber;
                quizServices.getGames().then(function (result) {
                    var games = result.data;

                    $scope.winningGame = games[Math.floor(Math.random() * games.length)];
                    $scope.choices = quizServices.convertGamesToChoices(games);
                    
                    $scope.counter = 150;
                    countdown = $interval(decreaseCountdown, 100);

                }, function (error) {
                    $scope.error = 'Oups! An error occurred while retrieving the games.';
                });
            };

        $scope.score = 0;
        $scope.quizNumber = 1;
        getGames();

        $scope.selectGame = function (id) {
            stopCountdown();
            if (id === $scope.winningGame.game_id) {
                $scope.score += 30 - Math.ceil($scope.counter / 10);
                endQuestion(1);
            } else {
                endQuestion(0);
            }
        };

    }]);
});
