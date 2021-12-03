'use strict';

const models = require('../../models');

exports.findArticleById = (id) => {
  return models.article.findByPk(id);
};

exports.createArticle = (article) => {
  return models.article.create(article);
};

exports.searchArticle = (searchField, skip, limit) => {
  return models.article.findAndCountAll({
    where: {
      [models.Sequelize.Op.or]: [
        { title: { [models.Sequelize.Op.substring]: '%' + searchField + '%' } },
        { description: { [models.Sequelize.Op.substring]: '%' + searchField + '%' } },
        { bodypara: { [models.Sequelize.Op.substring]: '%' + searchField + '%' } }
      ]
    },
    skip: skip,
    limit: limit,
    order: [['title', 'DESC'], ['updatedAt', 'DESC']]
  });
};

exports.ifArticleExist = (title) => {
  return models.article.findOne({
    where: {
      title
    }
  });
};

exports.updateArticle = (article) => {
  return models.article.update({ title: article.title, description: article.description, bodypara: article.bodypara }, { where: { id: article.id } });
};

exports.deleteArticle = (id) => {
  return models.article.destroy({ where: { id } });
};
