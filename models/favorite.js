'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  article: { type: mongoose.Types.ObjectId, ref: 'Article', unique: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' }

});

const Favorite = mongoose.model('favorite', favoriteSchema);
module.exports = Favorite;
