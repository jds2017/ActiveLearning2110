/* jshint node: true */
/* jshint esversion: 6 */

"use strict";

var User = require('./../models/userModel'),
    bcrypt = require('bcryptjs'),
    winston = require('winston');

var roles = {
    ADMIN: 'admin',
    INSTRUCTOR: 'instructor',
    STUDENT: 'student',
};

var updateRole = function(req, res, next) {
    winston.info('userController: update user role');

    User.findById(req.params.USERID)
        .exec()
        .then(function(user) {
            user.role = req.body.new_role;
            return user.save();
        })
        .then(function(user) {
            return res.status(200).json({
                success: true,
                message: 'User Role Updated',
                user: user
            });
        })
        .catch(function(err) {
            return res.status(404).json({
                success: false,
                message: 'Unable to Update User Role'
            });
        });
};

var deactivateUser = function(req, res, next) {
    winston.info('userController: deactivate user');

    User.findById(req.params.USERID)
        .exec()
        .then(function(user) {
            user.deactivated = !user.deactivated;
            return user.save();
        })
        .then(function(user) {
            return res.status(200).json({
                success: true,
                message: 'User Deactivation Updated',
                user: user
            });
        })
        .catch(function(err) {
            return res.status(404).json({
                success: false,
                message: 'User Deactivation Unsuccessful'
            });
        });
};

var getAll = function(req, res) {
    winston.info('userController: get all users');

    User.find()
        .exec()
        .then(function(users) {
            return res.status(200).json({
                success: true,
                user: users,
                message: "Success on getAll"
            });
        })
        .catch(function(err) {
            return res.status(500).json({
                success: false,
                message: 'Internal Error'
            });
        });
};

var getUser = function(req, res) {
    winston.info('userController: get user');

    User.findById(req.params.USERID)
        .exec()
        .then(function(user) {
            user.password = undefined;
            user.__v = undefined;
            return res.status(200).json({
                success: true,
                message: 'Request Success',
                user: user
            });
        })
        .catch(function(err) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        });
};

var setUserName = function(req, res, next) {
    winston.info('userController: set username');

    User.findById(req.decodedToken.sub, function(err, user) {
        if (err) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        } else {
            req.user = user;
            next();
        }
    });
};

var isValidStudent = function(req, res, next) {
    winston.info('userController: checking if user is valid');

    User.findOne({
        'username': req.body.username
    }, function(err, user) {
        if (err || !user) {
            console.log("Not found");
            req.body.password = "123456";
            req.instructorRegisteredStudent = true;
            next();
        } else {
            console.log("Found");
            req.student = user;
            next();
        }
    });
};

var updateUser = function(req, res) {
    winston.info('userController: update user');

    User.findById(req.params.USERID)
        .exec()
        .then(function(user) {
            return new Promise((resolve, reject) => {
                if (req.body.new_role) {
                    if (req.body.new_role === roles.ADMIN) {
                        var error_message = new Error('Invalid Role');
                        reject(error_message);
                    }
                }
                resolve(user);
            });
        })
        .then(function(user) {
            if (req.body.new_firstname) {
                user.firstname = req.body.new_firstname;
            }
            if (req.body.new_lastname) {
                user.lastname = req.body.new_lastname;
            }
            if (req.body.new_photo) {
                user.photo = req.body.new_photo;
            }
            if (req.body.new_password) {
                user.password = bcrypt.hashSync(req.body.new_photo, bcrypt.genSaltSync(10));
            }
            if (req.body.new_role) {
                user.role = req.body.new_role;
            }
            return user.save();
        })
        .then(function(user) {
            return res.status(200).json({
                success: true,
                message: 'User Updated',
                user: user
            });
        })
        .catch(function(err) {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        });
};

var updatePassword = function(req, res) {
    winston.info('userController: update password');

    User.findById(req.params.USERID)
        .exec()
        .then(function(user) {
            if (!bcrypt.compareSync(req.body.cur_password, user.password)) {
                throw new Error('Invalid Password');
            } else {
                user.password = bcrypt.hashSync(req.body.new_password, bcrypt.genSaltSync(10));
                return user.save();
            }
        })
        .then(function(user) {
            return res.status(200).json({
                success: true,
                message: 'User Password Updated',
                user_id: user._id.toString()
            });
        })
        .catch(function(err) {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        });
};

module.exports = {
    deactivateUser: deactivateUser,
    getAll: getAll,
    getUser: getUser,
    setUserName: setUserName,
    updatePassword: updatePassword,
    updateRole: updateRole,
    updateUser: updateUser,
    isValidStudent: isValidStudent
};
