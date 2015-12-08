/*global module, __dirname*/
module.exports = function (app) {
    'use strict';
    app.get('/', function (req, res) {
        res.sendFile('index.html', { root: __dirname });
    });
};
