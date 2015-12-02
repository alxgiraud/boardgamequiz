/*global define*/
define(['app'], function (app) {
	'use strict';
	app.factory('apiServices', ['$http', function ($http) {
		var urlBase = '/api';
		
		return {
			getRandomGame: function () {
				return $http.get(urlBase + '/games/random');
			}
		};

    }]);
});
