'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    unique: true
  },
  description: String,
  bodypara: String
});

const Article = mongoose.model('article', articleSchema);
module.exports = Article;
