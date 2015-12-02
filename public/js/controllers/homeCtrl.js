/*global define*/
define(['app', 'services/apiServices'], function (app) {
    'use strict';
    app.controller('HomeCtrl', ['$scope', 'apiServices', function ($scope, apiServices) {
        
        var getRandomGame = function () {
            apiServices.getRandomGame().then(function (result) {
                $scope.game = result.data;
            }, function (error) {
                $scope.game = "";
                $scope.error = "Oups! An error occurred while retrieving the game.";
            });
        };

        $scope.getGame = function () {
            getRandomGame();
        };

    }]);
});
