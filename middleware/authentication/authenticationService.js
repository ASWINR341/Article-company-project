'use strict';

const User = require('../../models/user');

exports.findUserById = (_id) => {
  return User.findOne({
    _id: _id
  });
};
