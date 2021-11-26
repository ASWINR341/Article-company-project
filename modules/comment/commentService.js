'use strict';
const Comment = require('../../models/comment');

exports.showComment = () => {
  return Comment.find();
};

exports.createComment = (comment) => {
  return new Comment(comment).save();
};

exports.updateComment = (comment) => {
  return Comment.updateOne({ _id: comment._id }, { message: comment.message });
};

exports.deleteComment = (_id) => {
  return Comment.deleteOne({ _id });
};
