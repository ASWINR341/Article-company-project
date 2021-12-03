'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
// const redisUtil = require('../../utilities/redis');
const articleService = require('./articleService');

exports.createArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const title = req.body.title;
    const description = req.body.description;
    const bodypara = req.body.bodypara;

    await articleService.createArticle({
      userId: userId,
      title: title,
      description: description,
      bodypara: bodypara
    });
    responseUtil.successResponse(res, messageUtil.articleCreated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

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
    const searchField = req.query.search || '';
    const data = await articleService.searchArticle(searchField, skip, limit);
    responseUtil.successResponse(res, messageUtil.articleFetched, {
      data
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.articleId;
    const title = req.body.title;
    const description = req.body.description;
    const bodypara = req.body.bodypara;

    await articleService.updateArticle({
      id: id,
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
    const id = req.params.articleId;

    await articleService.deleteArticle(id);

    responseUtil.successResponse(res, messageUtil.articleDeleted);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
