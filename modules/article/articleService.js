'use strict';

// const Article = require('../../models/article');
const models = require('../../models');

// exports.findArticleById = (_id) => {
//   return Article.findOne({
//     _id: _id
//   });
// };
exports.findArticleById = (id) => {
  return models.article.findByPk(id);
};

// exports.createArticle = (article) => {
//   return new Article(article).save();
// };
exports.createArticle = (article) => {
  return models.article.create(article);
};

// exports.searchArticle = (searchField, skip, limit) => {
//   return Article.find({ title: { $regex: searchField, $options: '$i' } }).skip(skip).limit(limit).sort('-title');
// };
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

// exports.countArticle = (searchField) => {
//   return Article.find({ title: { $regex: searchField, $options: '$i' } }).count();
// };
// exports.countArticle = (searchField) => {
//   return models.article.findAll({ title: { $regex: searchField, $options: '$i' } }).count();
// };

// exports.updateArticle = (article) => {
//   return Article.updateOne({ _id: article._id }, { title: article.title, description: article.description, bodypara: article.bodypara });
// };
exports.updateArticle = (article) => {
  return models.article.update({ title: article.title, description: article.description, bodypara: article.bodypara }, { where: { id: article.id } });
};

// exports.deleteArticle = (_id) => {
//   return Article.deleteOne({ _id });
// };
exports.deleteArticle = (id) => {
  return models.article.destroy({ where: { id } });
};
