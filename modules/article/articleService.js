'use strict';

const Article = require('../../models/article');

exports.findArticleById = (_id) => {
  return Article.findOne({
    _id: _id
  });
};

exports.createArticle = (article) => {
  return new Article(article).save();
};

// exports.showArticle = () => {
//   return Article.find();
// };

exports.searchArticle = (searchField, skip, limit) => {
  return Article.find({ title: { $regex: searchField, $options: '$i' } }).skip(skip).limit(limit).sort('-title');
};

exports.countArticle = (searchField) => {
  return Article.find({ title: { $regex: searchField, $options: '$i' } }).count();
};

exports.updateArticle = (article) => {
  return Article.updateOne({ _id: article._id }, { title: article.title, description: article.description, bodypara: article.bodypara });
};

exports.deleteArticle = (_id) => {
  return Article.deleteOne({ _id });
};
