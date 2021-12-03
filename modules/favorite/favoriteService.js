'use strict';

// const Favorite = require('../../models/favorite');
const models = require('../../models');

// exports.createFavorite = (favorite) => {
//   return new Favorite(favorite).save();
// };
exports.createFavorite = (favorite) => {
  return models.favorite.create(favorite);
};

// exports.deleteFavorite = (_id) => {
//   return Favorite.deleteOne({ _id });
// };
exports.deleteFavorite = (id) => {
  return models.favorite.destroy({ where: { id: id } });
};

// exports.showFavorite = () => {
//   return Favorite.find();
// };
exports.showFavorite = () => {
  return models.favorite.findAll();
};
