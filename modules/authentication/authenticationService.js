'use strict';

const models = require('../../models');

exports.findUserByEmail = (email) => {
  return models.user.findOne({
    where: {
      email: email
    }
  });
};

exports.ifEmailExist = (email) => {
  return models.user.findOne({
    where: {
      email
    }
  });
};

exports.findUserById = (id) => {
  return models.user.findByPk(id);
};

exports.signup = (user) => {
  return models.user.create(user);
};
