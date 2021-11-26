'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  article: { type: mongoose.Types.ObjectId, ref: 'Article' },
  message: String,
  user: { type: mongoose.Types.ObjectId, ref: 'User' }

});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
