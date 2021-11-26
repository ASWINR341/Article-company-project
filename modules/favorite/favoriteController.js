'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
const favoriteService = require('./favoriteService');

exports.createFavorite = async (req, res) => {
  try {
    const user = req.user;
    const article = req.body.articleId;

    await favoriteService.createFavorite({
      user: user,
      article: article
    });
    responseUtil.successResponse(res, messageUtil.favoriteCreated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const _id = req.params.favoriteId;

    await favoriteService.deleteFavorite({ _id });

    responseUtil.successResponse(res, messageUtil.favoriteDeleted);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.showFavorite = async (req, res) => {
  try {
    const favoriteData = await favoriteService.showFavorite();

    responseUtil.successResponse(res, messageUtil.commentFetched, {
      favoriteData
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
