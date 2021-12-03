'use strict';

const models = require('../../models');

exports.createFavorite = (favorite) => {
  return models.favorite.create(favorite);
};

exports.deleteFavorite = (id) => {
  return models.favorite.destroy({ where: { id: id } });
};

exports.showFavorite = () => {
  return models.favorite.findAll();
};
