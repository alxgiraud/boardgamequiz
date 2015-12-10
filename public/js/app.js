/*global define, angular*/
define(['angularAMD', 'angular-route', 'roundProgress'], function (angularAMD) {
    'use strict';

    var app = angular.module('guess-bg', ['ngRoute', 'angular-svg-round-progress']);

    app.constant('GameConstants', {
        COUNTDOWN: 15,                  // time allowed to the player to chose a game in second
        GAMES_PER_ROUND: 10,            // amount of games to chose per round
        DELAY_BEFORE_NEXT_TURN: 1000,   // "break" time before next turn
        BASE_SCORE: 30,                 // Points earned for each correct choice
        TIME_BONUS: 1                   // Score bonus per second remaining
    });


    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: '../views/home.html',
                controller: 'HomeCtrl',
                controllerUrl: 'controllers/homeCtrl'
            }))
            .when("/quiz", angularAMD.route({
                templateUrl: '../views/quiz.html',
                controller: 'QuizCtrl',
                controllerUrl: 'controllers/quizCtrl'
            }))
            .when("/end", angularAMD.route({
                templateUrl: '../views/end.html',
                controller: 'EndCtrl',
                controllerUrl: 'controllers/endCtrl'
            }))
            .otherwise({
                redirectTo: '/'
            });
    });

    return angularAMD.bootstrap(app);
});
