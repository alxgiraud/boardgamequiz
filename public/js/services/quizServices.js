/*global define*/
define(['app', 'services/apiServices'], function (app) {
    'use strict';
    app.factory('quizServices', ['$q', 'apiServices', function ($q, apiServices) {

        var privateVariables = {
                score: 0,
                clueProperties: [
                    'year_published',
                    'min_players',
                    'playing_time',
                    'min_age',
                    'publishers',
                    'artists',
                    'categories',
                    'mechanics',
                    'designers'
                ]
            },
            privateMethods = {
                // Return the name with the type "primary"
                getPrimaryName: function (names) {
                    if ((typeof names !== 'undefined')) {
                        var i, l = names.length;

                        for (i = 0; i < l; i += 1) {
                            if (names[i].hasOwnProperty('type') &&
                                    names[i].type === 'primary') {
                                return names[i].value;
                            }
                        }
                    }

                    return 'Name not found';
                },
                
                // Return the name of a property between all the properties available for a clue 
                getRandomProperty: function () {
                    var l = privateVariables.clueProperties.length;
                    return privateVariables.clueProperties[Math.floor(Math.random() * l)];
                },
                
                // Check is the existing clues already have the property
                hasClueProperty: function (clues, property) {
                    var i, l = clues.length;

                    for (i = 0; i < l; i += 1) {
                        if (clues[i].id_property === property) {
                            return true;
                        }
                    }
                    return false;
                },
                
                // Return the label (i. e. friendly name) for a given property
                getLabel: function (property) {
                    var label;
                    
                    switch (property) {
                    case 'year_published':
                        label = 'Year Published';
                        break;
                    case 'min_players':
                        label = '# of Players';
                        break;
                    case 'max_players':
                        label = 'Year Published';
                        break;
                    case 'playing_time':
                        label = 'Playing Time';
                        break;
                    case 'min_age':
                        label = 'Suggested Ages';
                        break;
                    case 'publishers':
                        label = 'Publishers';
                        break;
                    case 'artists':
                        label = 'Artists';
                        break;
                    case 'categories':
                        label = 'Categories';
                        break;
                    case 'mechanics':
                        label = 'Mechanics';
                        break;
                    case 'designers':
                        label = 'Designers';
                        break;
                    default:
                        label = 'Unknown Property';
                    }
                    
                    return label;
                },
                
                // Return the first three fields 'value' fro the given attributes array
                getFirstThreeValues: function (attributes) {
                    var i,
                        l = (attributes.length > 3) ? 3 : attributes.length,
                        values = [];

                    for (i = 0; i < l; i += 1) {
                        if (attributes[i].hasOwnProperty('value')) {
                            values.push(attributes[i].value);
                        }
                    }

                    return values;
                },
                
                // Return value for the given property and manage special cases
                getValue: function (game, property) {
                    var value;

                    if (property === 'playing_time') {
                        value = game[property] + ' minutes';
                        
                    } else if (property === 'min_players' &&
                            game.hasOwnProperty('max_players') &&
                            game.max_players > game.min_players) {
                        
                        value = game[property] + ' - ' + game.max_players;
                        
                    } else if (property === 'min_age') {
                        value = game[property] + ' and up';
                 
                    } else {
                        value = game[property];
                        
                    }

                    return value;
                }
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
                        name: privateMethods.getPrimaryName(games[i].names)
                    });
                }

                return choices;
            },
            getRandomClues: function (game) {
                var property,
                    clues = [],
                    clue,
                    i;

                while (clues.length < 4) {
                    property = privateMethods.getRandomProperty();
                    if (game.hasOwnProperty(property) &&
                            !privateMethods.hasClueProperty(clues, property) &&
                            (typeof game[property].length === 'undefined' ||
                             game[property].length > 0)) {

                        clues.push({
                            id_property: property,
                            label: privateMethods.getLabel(property),
                            values: (game[property] instanceof Array) ?
                                    privateMethods.getFirstThreeValues(game[property]) :
                                    [privateMethods.getValue(game, property)]
                        });
                    }
                }

                return clues;

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