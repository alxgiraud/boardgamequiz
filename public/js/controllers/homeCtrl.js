/*global define*/
define(['app'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.launch = function () {
            $location.path('quiz');
        };

    }]);
});
