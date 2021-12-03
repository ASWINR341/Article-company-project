'use strict';
// const Comment = require('../../models/comment');
const models = require('../../models');

// exports.showComment = () => {
//   return Comment.find();
// };
exports.showComment = () => {
  return models.comment.findAll();
};

// exports.createComment = (comment) => {
//   return new Comment(comment).save();
// };
exports.createComment = (comment) => {
  return models.comment.create(comment);
};

// exports.updateComment = (comment) => {
//   return Comment.updateOne({ _id: comment._id }, { message: comment.message });
// };
exports.updateComment = (comment) => {
  return models.comment.update({ message: comment.message }, { where: { id: comment.id } });
};

// exports.deleteComment = (_id) => {
//   return Comment.deleteOne({ _id });
// };
exports.deleteComment = (id) => {
  return models.comment.destroy({ where: { id: id } });
};
