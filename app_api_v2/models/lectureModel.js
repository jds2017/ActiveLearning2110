/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var student_data = {
    student_id: String,
    score: String
};

var question_snapshot = {
    question_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
        lowercase: true
    },
    copied: {
        type: Boolean,
        required: true
    },
    "_id": false
};

var LectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    live: {
        type: Boolean,
        default: false
    },
    post_lecture: {
        type: Boolean,
        default: false
    },
    course_id: {
        type: String,
        required: true
    },
    course_oid: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    instructor_id: {
        type: String,
        required: true
    },
    questions: [question_snapshot],
    schedule: {
        day: {
            type: String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri']
        },
        date: String
    }
});

module.exports = mongoose.model('Lecture', LectureSchema);
