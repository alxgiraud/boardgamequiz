/*global define*/
define(['app', 'services/apiServices'], function (app) {
    'use strict';
    app.controller('LeaderboardCtrl', ['$scope', '$location', '$filter', 'apiServices', function ($scope, $location, $filter, apiServices) {

        var leaderboard = [];
        $scope.loading = true;

        apiServices.getLeaderboard().success(function (result) {
            leaderboard = result;
            $scope.loading = false;
            $scope.leaderboard = leaderboard;
            $scope.viewby = 10;
            $scope.totalItems = $scope.leaderboard.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

        }).error(function (error) {
            $scope.error = 'Oups! An error occurred while getting the leaderboard.';

        });

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.searchLeaderboard = function () {
            $scope.currentPage = 1; //Force first page on search
            $scope.leaderboard = $filter('filter')(leaderboard, {
                username: $scope.searchText
            });
            $scope.totalItems = $scope.leaderboard.length;
        };
    }]);
});
