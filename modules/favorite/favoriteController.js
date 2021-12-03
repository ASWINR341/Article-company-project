'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
const favoriteService = require('./favoriteService');

exports.createFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const articleId = req.body.articleId;

    await favoriteService.createFavorite({
      userId: userId,
      articleId: articleId
    });
    responseUtil.successResponse(res, messageUtil.favoriteCreated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const id = req.params.favoriteId;
    console.log(id);

    await favoriteService.deleteFavorite(id);

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
