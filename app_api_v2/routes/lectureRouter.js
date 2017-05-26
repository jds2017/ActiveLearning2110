/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

var express = require('express');
var lectureRouter = express.Router();

var lectureController = require('./../controllers/lectureController');

/**
Get Lecture Details

GET	/api_v2/lecture/{lecture_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id String	required
Query String:     none
Request Body: 	  none
**/
lectureRouter.route('/:LECTUREID')
    .get(lectureController.getLecture);

/**
Add Question

IMPORTANT-Instructor ID's on both lecture and question must match. If you
are attempting to add a question created by another instructor you must
first call the copy question from existing API call and then add the
copy to the lecture.

POST	/api_v2/lecture/{lecture_id}/questions/{question_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id, question_id String	required
Query String:     none
Request Body: 	  none
**/
lectureRouter.route('/:LECTUREID/questions/:QUESTIONID')
    .post(lectureController.addQuestionToLecture);

/**
Reorder Lecture Question

POST	/api_v2/lecture/{lecture_id}/questions{question_id}/reorder

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id String	required
Query String:     none
Request Body: application/json
{
	"index"				: Number Required This is the index where you want the question to go
}
**/
lectureRouter.route('/:LECTUREID/questions/:QUESTIONID/reorder')
    .post(lectureController.reorderQuestion);


/**
Remove Question

DELETE	/api_v2/lecture/{lecture_id}/questions{question_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id, question_id String	required
Query String:     none
Request Body: 	  none
**/
lectureRouter.route('/:LECTUREID/questions/:QUESTIONID')
    .delete(lectureController.removeQuestion);

/**
Save Question Set

POST	/api_v2/lecture/{lecture_id}/questionset

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id String	required
Query String:     none
Request Body: application/json
{
	"title"				: String Required
}
**/
lectureRouter.route('/:LECTUREID/questionset')
    .post(lectureController.saveQuestionSet);

/**
Add Question Set to Lecture

POST	/api_v2/lecture/{lecture_id}/questionset/{questionSet_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  lecture_id, questionSet_id String	required
Query String:     none
Request Body: 	  none
**/
lectureRouter.route('/:LECTUREID/questionset/:QUESTIONSETID')
    .post(lectureController.addQuestionSet);

module.exports = lectureRouter;
