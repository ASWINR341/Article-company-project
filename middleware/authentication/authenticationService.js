'use strict';

// const User = require('../../models/user');
const models = require('../../models');

// exports.findUserById = (_id) => {
//   return User.findOne({
//     _id: _id
//   });
// };

exports.findUserById = (id) => {
  return models.user.findOne({
    where: {
      id: id
    }
  });
};
