/* jshint node: true */

"use strict";

var express = require('express');
var api_v2_router = express.Router();

var api_v2_routes = require('./routes');

module.exports = function(app) {
    app.use('/api_v2', api_v2_router);
    api_v2_routes(api_v2_router);
};
