/* jshint node: true */

"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var admin = {
    user_id: {
        type: String,
        required: true
    }
};

var user = {
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
    }
};

var RegistrationKeySchema = new Schema({
    role: {
        type: String,
        enum: ['instructor', 'admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin_creator: {
        type: admin
    },
    user: {
        type: user
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    validated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('RegisterKey', RegistrationKeySchema);
