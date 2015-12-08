/*global define*/
define(['app', 'services/apiServices'], function (app) {
    'use strict';
    app.factory('quizServices', ['$q', 'apiServices', function ($q, apiServices) {

        var score = 0,
            getPrimaryName = function (names) {
                if ((typeof names !== 'undefined')) {
                    var i, l = names.length;

                    for (i = 0; i < l; i += 1) {
                        if (names[i].hasOwnProperty('type') && names[i].type === 'primary') {
                            return names[i].value;
                        }
                    }
                }

                return 'Name not found';
            };


        return {
            getGames: function () {
                return apiServices.getThreeRandomGames();
            },
            convertGamesToChoices: function (games) {
                var choices = [],
                    i,
                    l = games.length;

                for (i = 0; i < l; i += 1) {
                    choices.push({
                        id: i,
                        gameId: games[i].game_id,
                        thumbnail: games[i].thumbnail,
                        name: getPrimaryName(games[i].names)
                    });
                }
                return choices;
            },
            saveScore: function (score) {
                var deferred = $q.defer();
                deferred.resolve(this.score = score);
                return deferred.promise;
            },
            getScore: function () {
                return this.score;
            }
        };

    }]);
});
