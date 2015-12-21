/*global require*/
require.config({
    baseUrl: "js",
    paths: {
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route',
        'angular-animate': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-animate',
        'angularAMD': 'https://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        'roundProgress': '../lib/roundProgress',
        'ui-bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap',
        'ui-bootstrap-tpls': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-animate': ['angular'],
        'roundProgress': ['angular'],
        'ui-bootstrap': ['angular'],
        'ui-bootstrap-tpls': ['angular']
    },
    deps: ['app']
});
