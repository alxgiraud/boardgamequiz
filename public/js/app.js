/*global define, angular*/
define(['angularAMD', 'angular-route'], function (angularAMD) {
    'use strict';
    var app = angular.module('guess-bg', ['ngRoute']);

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
