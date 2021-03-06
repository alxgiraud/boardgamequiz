/*global define, angular*/
define(['angularAMD', 'angular-route', 'angular-animate', 'roundProgress', 'smoothScroll', 'ui-bootstrap', 'ui-bootstrap-tpls'], function (angularAMD) {
    'use strict';

    var app = angular.module('guess-bg', ['ngRoute', 'ngAnimate', 'angular-svg-round-progress', 'smoothScroll', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    
    app.constant('GameConstants', {
        COUNTDOWN: 15,                  // time allowed to the player to chose a game in second
        GAMES_PER_ROUND: 10,            // amount of games to chose per round
        DELAY_BEFORE_NEXT_TURN: 1000,   // "break" time before next turn
        BASE_SCORE: 3000,               // Points earned for each correct choice
        TIME_BONUS: 10,                 // Score bonus per ms remaining
        COMBO_TRIGGER: 2,               // Number of correct answers in a row before combo bonus points 
        MAX_COMBO_BONUS: 5              // Number of combo max
    });

    app.config(['$httpProvider', function ($httpProvider) {

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    }]);
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: '../views/home.html'
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
            .when("/leaderboard", angularAMD.route({
                templateUrl: '../views/leaderboard.html',
                controller: 'LeaderboardCtrl',
                controllerUrl: 'controllers/leaderboardCtrl'
            }))
            .when("/about", angularAMD.route({
                templateUrl: '../views/about.html'
            }))
            .otherwise({
                redirectTo: '/'
            });
    });

    return angularAMD.bootstrap(app);
});
