/* jshint node: true */

"use strict";

var express = require('express');
var courseRouter = express.Router();

var authorizeController = require('./../controllers/authorizeController');
var inputController = require('./../controllers/inputController');
var userController = require('./../controllers/userController');
var courseController = require('./../controllers/courseController');
var lectureController = require('./../controllers/lectureController');
var signupController = require('./../controllers/signupController');

/**
Create Course

POST	/api_v2/course

Authentication:   user token
Authorization:    instructor

Path Parameters:  none
Query String:     none
Request Body:     application/json     required
{
    "title":      String               required
    "sections":   [
                    {
                      "name": String
                    }
                  ]                    required
    "course_schedule":
    {
        "semester": String             required
        "days":     [String]           required     enum ["mon", "tue", "wed", "thu", "fri"] required
        "time":     String             required
    }
}
**/
courseRouter.route('/')
    .post(authorizeController.instructor,
        inputController.requireCourseTitle,
        inputController.requireCourseSchedule,
        inputController.requireSections,
        courseController.savedCourseToDB);

/**
Student join course

POST	/api_v2/course/students

Authentication:   user token
Authorization:    student

Path Parameters:  none
Query String:     none
Request Body:     application/json    required
{
  "section_key":   String             required
}
**/
courseRouter.route('/students')
    .post(authorizeController.student,
        courseController.joinCourse,
        courseController.getUserCourses);

/**
Add student to course

POST  /api_v2/course/{course_id}/sections/{section_id}/students/

Authentication:   user token
Authorization:    instructor

Path Parameters:  course_id, section_id String    required
Query String:     none
Request Body:     application/json    required
{
 "username":     String              required
 "firstname":    String              required
 "lastname":     String              required
}
**/
courseRouter.route('/:COURSEID/sections/:SECTIONID/students')
    .post(authorizeController.instructor,
        inputController.requireFirstname,
        inputController.requireLastname,
        inputController.requireUsername,
        courseController.instructorAddStudent);

/**
Remove student from course

DELETE	/api_v2/course/{course_id}/sections/{section_id}/students/{user_id}/

Authentication:   user token
Authorization:    admin, instructor or self student

Path Parameters:  course_id, user_id String    required
Query String:     none
Request Body:     none
**/
courseRouter.route('/:COURSEID/sections/:SECTIONID/students/:USERID')
    .delete(authorizeController.adminOrInstructorOrSelf,
        courseController.deleteStudentFromCourse);

/**
Course info

GET	/api_v2/course/{course_id}/

Authentication:   user token
Authorization:    instructor

Path Parameters:  course_id String    required
Query String:     none
Request Body:     none
**/
courseRouter.route('/:COURSEID')
    .get(courseController.getCourse);

/**
Add course lecture

POST	/api_v2/course/{course_id}/lectures

Authentication:   user token
Authorization:    instructor

Path Parameters:  course_id String    required
Query String:     none
Request Body:     application/json    required
{
    "lecture_title":        String              required
    "lecture_schedule":
    {
        "day":      String              required     enum ["mon", "tue", "wed", "thu", "fri"] required
        "date":     String              required     'YYYY-MM-DD'
    }
}
**/
courseRouter.route('/:COURSEID/lectures')
    .post(authorizeController.instructor,
        lectureController.savedLectureToDB);

/**
Get course lectures

GET	/api_v2/course/{course_id}/lectures

Authentication:   user token
Authorization:    instructor

Path Parameters:  course_id String    required
Query String:     none
Request Body:     none
**/
courseRouter.route('/:COURSEID/lectures')
    .post(authorizeController.instructor,
        lectureController.getCourseLectures);

module.exports = courseRouter;
