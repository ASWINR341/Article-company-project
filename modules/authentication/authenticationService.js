'use strict';

// const User = require('../../models/user');
const models = require('../../models');

// exports.findUserByEmail = (email) => {
//   return User.findOne({
//     email: email
//   }, {
//     email: 1,
//     password: 1
//   });
// };
exports.findUserByEmail = (email) => {
  return models.user.findOne({
    where: {
      email: email
    }
  });
};

// exports.findUserById = (_id) => {
//   return User.findOne({
//     _id: _id
//   });
// };
exports.findUserById = (id) => {
  return models.user.findByPk(id);
};

// exports.signup = (user) => {
//   return new User(user).save();
// };
exports.signup = (user) => {
  return models.user.create(user);
};
