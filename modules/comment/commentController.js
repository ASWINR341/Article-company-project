'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
// const redisUtil = require('../../utilities/redis');
const commentService = require('./commentService');

exports.createComment = async (req, res, next) => {
  try {
    const user = req.user;
    const message = req.body.message;
    const article = req.params.articleId;

    await commentService.createComment({
      user: user,
      message: message,
      article: article
    });
    responseUtil.successResponse(res, messageUtil.commentCreated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.showComment = async (req, res, next) => {
  try {
    const commentData = await commentService.showComment();

    responseUtil.successResponse(res, messageUtil.commentFetched, {
      commentData
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const _id = req.params.commentId;
    const message = req.body.message;

    await commentService.updateComment({
      _id: _id,
      message: message
    });
    responseUtil.successResponse(res, messageUtil.commentUpdated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const _id = req.params.commentId;

    await commentService.deleteComment({ _id });

    responseUtil.successResponse(res, messageUtil.commentDeleted);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
