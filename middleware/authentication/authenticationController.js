'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
const authenticationService = require('./authenticationService');
const redisUtil = require('../../utilities/redis');

exports.userTokenCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.badResponseToken);
    }

    const userDecoded = await redisUtil.checkSession(token);

    if (!userDecoded) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.badResponseToken);
    }
    const user = await authenticationService.findUserById(userDecoded._id);
    if (!user) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.userbadResponseToken);
    };
    req.user = user;
    next();
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
