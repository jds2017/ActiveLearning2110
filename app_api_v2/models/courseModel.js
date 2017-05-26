/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lecture_snapshot = {
    lecture_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    schedule: {
        day: {
            type: String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri']
        },
        date: String
    },
    "_id": false
};

var student_snapshot = {
    student_id: {
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
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    },
    average: {
        type: Number,
        default: 0
    },
    "_id": false
};

var section_snapshot = {
    name: {
        type: String
    },
    _id: {
        type: String,
        required: true
    },
    section_key: {
        type: String,
        required: true,
        unique: true
    },
    students: [student_snapshot]
};

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
    }
});

module.exports = mongoose.model('Course', CourseSchema);
