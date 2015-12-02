/*global require*/
require.config({
	baseUrl: "js",
	paths: {
		'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular',
		'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route',
		'angularAMD': 'https://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min'
	},
	shim: {
		'angularAMD': ['angular'],
		'angular-route': ['angular']
	},
	deps: ['app']
});
