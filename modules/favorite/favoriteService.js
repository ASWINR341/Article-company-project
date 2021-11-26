'use strict';
const Favorite = require('../../models/favorite');

exports.createFavorite = (favorite) => {
  return new Favorite(favorite).save();
};

exports.deleteFavorite = (_id) => {
  return Favorite.deleteOne({ _id });
};

exports.showFavorite = () => {
  return Favorite.find();
};
