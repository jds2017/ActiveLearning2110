/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var QuestionSetSchema = new Schema({
    instructor_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    questions: [question_snapshot],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuestionSet', QuestionSetSchema);
