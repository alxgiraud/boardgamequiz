/*global define, angular*/
define(['app', 'services/quizServices', 'services/apiServices'], function (app) {
    'use strict';
    app.controller('EndCtrl', ['$scope', 'quizServices', 'apiServices', function ($scope, quizServices, apiServices) {

        var endHelper = {
            init: function () {
                $scope.submitted = false;
                $scope.submitBtnLabel = 'Save your score';

                $scope.score = quizServices.getScore();
                endHelper.getTopLeaderBoard();
            },
            getTopLeaderBoard: function () {
                apiServices.getTopLeaderboard().success(function (result) {
                    $scope.topLeaderboard = result;

                }).error(function (error) {
                    $scope.error = 'Oups! An error occurred while getting the leaderboard.';

                });
            },
            submitPerformance: function () {
                if (typeof $scope.username !== 'undefined' && !$scope.submitted) {
                    $scope.submitted = true;

                    var score = quizServices.getScore(),
                        username = $scope.username,
                        performance;

                    if (!isNaN(score)) {
                        performance = angular.toJson({
                            username: username,
                            score: score
                        });

                        apiServices.addToLeaderboard(performance).success(function (result) {
                            endHelper.getTopLeaderBoard(); //Refresh the leaderboard
                            endHelper.getPersonalLeaderboard(username, score);
                            $scope.submitBtnLabel = 'Score saved!';
                            $scope.scoreSaved = true;

                        }).error(function (error) {
                            $scope.submitted = false;
                            $scope.error = 'Oups! An error occurred while saving your score.';

                        });
                    } else {
                        $scope.submitted = false;
                        $scope.error = 'Oups! Your score isn\'t valid.';
                    }
                }
            },
            getPersonalLeaderboard: function (username, score) {
                apiServices.getPersonalLeaderboard(username, score).success(function (result) {
                    var i;
                    for (i = 0; i < result.length; i += 1) {
                        if (result[i].hasOwnProperty('topPercentage')) {
                            $scope.topPercentage = result[i].topPercentage;
                            break;
                        }
                    }
                    
                    $scope.personalLeaderboard = result;
                    

                }).error(function (error) {
                    $scope.error = 'Oups! An error occurred while getting your leaderboard.';
                });
            }
        };

        endHelper.init();

        $scope.submitPerformance = function () {
            endHelper.submitPerformance();
        };
    }]);
});
