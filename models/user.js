'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  bio: String,
  image: String,
  password: {
    type: String,
    required: true
  },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  following: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
