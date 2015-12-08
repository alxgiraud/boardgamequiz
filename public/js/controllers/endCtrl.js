/*global define, angular*/
define(['app', 'services/quizServices'], function (app) {
    'use strict';
    app.controller('EndCtrl', ['$scope', 'quizServices', function ($scope, quizServices) {

        $scope.score = quizServices.getScore();

    }]);
});
