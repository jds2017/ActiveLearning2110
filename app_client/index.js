/* jshint node: true */


"use strict";

module.exports = function(app) {
    /**
    Respond to GET request

    - parameter PATH:       SPA route
    - parameter HANDLER:    callback
    */
    app.get('/', function(req, res) {
        res.sendfile('index.html');
    });
};
