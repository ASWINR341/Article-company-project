'use strict';

const User = require('../../models/user');

exports.findUserByEmail = (email) => {
  return User.findOne({
    email: email
  }, {
    email: 1,
    password: 1
  });
};

exports.findUserById = (_id) => {
  return User.findOne({
    _id: _id
  });
};

exports.signup = (user) => {
  return new User(user).save();
};
