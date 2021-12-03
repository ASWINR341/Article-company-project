'use strict';

const models = require('../../models');

exports.findUserById = (id) => {
  return models.user.findOne({
    where: {
      id: id
    }
  });
};
