/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var answer_choice = {
    text: {
        type: String,
        required: true
    },
    answer: {
        type: Boolean,
        required: true
    },
    "_id": false
};

var QuestionSchema = new Schema({
    instructor_id: {
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
    html_title: {
        type: String,
        required: true
    },
    html_body: {
        type: String,
        required: true,
    },
    answer_choices:[answer_choice],
    copied: {
        type: Boolean,
        required: true,
    }
});


module.exports = mongoose.model('Question', QuestionSchema);
