'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
// const redisUtil = require('../../utilities/redis');
const articleService = require('./articleService');

exports.createArticle = async (req, res, next) => {
  try {
    const user = req.user;
    const title = req.body.title;
    const description = req.body.description;
    const bodypara = req.body.bodypara;

    await articleService.createArticle({
      user: user,
      title: title,
      description: description,
      bodypara: bodypara
    });
    responseUtil.successResponse(res, messageUtil.articleCreated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
// exports.showArticle = async (req, res, next) => {
//   try {
//     const mongoData = await articleService.showArticle();

//     responseUtil.successResponse(res, messageUtil.articleFetched, {
//       mongoData
//     });
//   } catch (ex) {
//     responseUtil.serverErrorResponse(res, ex);
//   }
// };

exports.searchArticle = async (req, res, next) => {
  try {
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    const skip = (parseInt(page) - 1) * limit;
    const searchField = req.query.title;
    const data = await articleService.searchArticle(searchField, skip, limit);
    const count = await articleService.countArticle(searchField);
    responseUtil.successResponse(res, messageUtil.articleFetched, {
      data, count
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const _id = req.params.favoriteArticleId;
    const title = req.body.title;
    const description = req.body.description;
    const bodypara = req.body.bodypara;

    await articleService.updateArticle({
      _id: _id,
      title: title,
      description: description,
      bodypara: bodypara
    });
    responseUtil.successResponse(res, messageUtil.articleUpdated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
exports.deleteArticle = async (req, res) => {
  try {
    const _id = req.params.articleId;

    await articleService.deleteArticle({ _id });

    responseUtil.successResponse(res, messageUtil.articleDeleted);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
