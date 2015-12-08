/*global define, angular*/
define(['app'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.test = function () {
            $location.path('quiz');
        };

    }]);
});
