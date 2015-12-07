/*global define, angular*/
define(['angularAMD', 'angular-route', 'roundProgress'], function (angularAMD) {
    'use strict';

    var app = angular.module('guess-bg', ['ngRoute', 'angular-svg-round-progress']);

    app.constant('GameConstants', {
        COUNTDOWN: 150,                // time allowed to the player to chose a game (in ms)
        GAMES_PER_ROUND: 10,            // amount of games to chose per round
        DELAY_BEFORE_NEXT_TURN: 1000,   // "break" time before next turn
        BASE_SCORE: 30,                 // Score earn for each correct choice
        TIME_BONUS: 0.1                 // Coefficient multiplying the remaining time before the end of the turn
    });


    app.config(function ($routeProvider) {
        $routeProvider.when("/", angularAMD.route({
            templateUrl: '../views/home.html',
            controller: 'HomeCtrl',
            controllerUrl: 'controllers/homeCtrl'
        })).otherwise({
            redirectTo: '/'
        });
    });

    return angularAMD.bootstrap(app);
});
