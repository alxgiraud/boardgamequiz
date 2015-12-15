/*global define*/
define(['app'], function (app) {
    'use strict';
    app.factory('apiServices', ['$http', function ($http) {
        var urlBase = '/api';

        return {
            getThreeRandomGames: function () {
                return $http.get(urlBase + '/games/random');
            },
            getTopLeaderboard: function () {
                return $http.get(urlBase + '/leaderboard/top');
            },
            addToLeaderboard: function (performance) {
                return $http.post(urlBase + '/leaderboard/add', performance);
            },
            getPersonalLeaderboard: function (username, score) {
                return $http.get(urlBase + '/leaderboard/personal?username=' + username + '&score=' + score);
            }
        };

    }]);
});
