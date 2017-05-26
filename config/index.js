/* jshint node: true */

"use strict";

module.exports = {
    'database': 'mongodb://localhost/ActiveLearning',
    'jwt_secret': 'activelearning',
    'log_file': 'system.log',
    'jwt_settings': {
        expiresIn: '1hr'
    }
};
