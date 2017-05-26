/* jshint node: true */

"use strict";

var authRouter = require('./authRouter');
var signupRouter = require('./signupRouter');
var userRouter = require('./userRouter');
var courseRouter = require('./courseRouter');
var questionRouter = require('./questionRouter');
var lectureRouter = require('./lectureRouter');
var resultRouter = require('./resultRouter');

module.exports = function(api_v2_router) {
    api_v2_router.use('/authenticate', authRouter);
    api_v2_router.use('/user', userRouter);
    api_v2_router.use('/signup', signupRouter);
    api_v2_router.use('/course', courseRouter);
    api_v2_router.use('/question', questionRouter);
    api_v2_router.use('/lecture', lectureRouter);
    api_v2_router.use('/result', resultRouter);
};
