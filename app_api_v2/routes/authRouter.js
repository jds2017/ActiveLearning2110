/* jshint node: true */

"use strict";

var express = require('express');
var authRouter = express.Router();

var authenticateController = require('./../controllers/authenticateController');
var inputController = require('./../controllers/inputController');
var courseController = require('./../controllers/courseController');

/**
AUTHENTICATE USER

POST	/api_v2/authenticate

Authentication:   none
Authorization:    none

Path Parameters:  none
Query String:     none
Request Body:     application/json     required
{
  "username": String Required
  "password": String Required
}
**/
authRouter.route('/')
    .post(inputController.requireUsername,
        inputController.requirePassword,
        authenticateController.authenticate,
        courseController.updateStudentStatus;
        //need to put something in session instead

/**
LOG OUT USER

DELETE	/api_v2/authenticate

Authentication:  user token        required
Authorization:   none

Path Parameters: none
Query String:    none
Request Body:    none
**/
authRouter.route('/')
    .delete();
    //need to remove that something in session instead

module.exports = authRouter;
