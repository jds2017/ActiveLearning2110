/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiveLectureSchema = new Schema({
    lecture_id: {
        type: String,
        required: true,
        unique: true
    },
    course_oid: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    instructor_socket: {
        type: String,
        required: true,
        unique: true
    },
    current_question: {
        type: Object
    }
});

module.exports = mongoose.model('LiveLecture', LiveLectureSchema);
