/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('EndCtrl', ['$scope', '$location', 'quizServices', function ($scope, $location, quizServices) {

        $scope.score = quizServices.getScore();
        $scope.reset = function () {
            $location.path('quiz');
        };
    }]);
});
