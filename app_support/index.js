/* jshint node: true */

"use strict";

module.exports = function(app) {
  app.get('/support', function(req, res){
    res.sendFile(__dirname + '/views/support.html');
  });
};
