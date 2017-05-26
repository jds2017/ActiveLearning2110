/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

var express = require('express');
var resultRouter = express.Router();

var lectureController = require('./../controllers/lectureController');

/**
Get Instructor Results

GET	/api_v2/result/{lecture_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id
Query String:     none
Request Body: 	  none
**/
resultRouter.route('/:LECTUREID/')
    .get(lectureController.getInstructorResults);

/**
Get Student Results

GET	/api_v2/result/{lecture_id}/student/{student_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id String	required
Query String:     none
Request Body: 	  none
**/
resultRouter.route('/:LECTUREID/student/:STUDENTID')
    .get(lectureController.getStudentResults);

module.exports = resultRouter;
