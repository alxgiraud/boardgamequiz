/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('EndCtrl', ['$scope', '$http', '$location', 'quizServices', function ($scope, $http, $location, quizServices) {

        var submitted = false;

        $scope.score = quizServices.getScore();

        $scope.submit = function () {
            if (typeof $scope.userName !== 'undefined' && !submitted) {
                submitted = true;

                //TODO: remove submit button
                var score = quizServices.getScore();
                if (!isNaN(score)) {
                    $http.post('/api/score/save', angular.toJson({
                        username: $scope.userName,
                        score: score
                    })).success(function (result) {
                        //TODO: message score saved
                    }).error(function (error) {
                        submitted = false;
                        $scope.error = 'Oups! An error occurred while saving your score.';
                    });
                } else {
                     $scope.error = 'Oups! Your score isn\'t valid.';
                }
            }
        };

        $scope.reset = function () {
            $location.path('quiz');
        };
    }]);
});
