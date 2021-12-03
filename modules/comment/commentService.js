'use strict';

const models = require('../../models');

exports.showComment = () => {
  return models.comment.findAll();
};

exports.createComment = (comment) => {
  return models.comment.create(comment);
};

exports.updateComment = (comment) => {
  return models.comment.update({ message: comment.message }, { where: { id: comment.id } });
};

exports.deleteComment = (id) => {
  return models.comment.destroy({ where: { id: id } });
};
