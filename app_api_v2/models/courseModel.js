/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        instructor_id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        photo: {
            type: String
        }
    },
    students: [String],
    tas: [String],
    schedule: {
        days: {
            type: [{
                type: String,
                enum: ['mon', 'tue', 'wed', 'thu', 'fri']
            }]
        },
        semester: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    course_key: {
        type: String,
        required: true,
        unique: true
    },
    ta_key: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);
