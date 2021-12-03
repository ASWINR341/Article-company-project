'use strict';

const messageUtil = require('../../utilities/message');
const passwordUtil = require('../../utilities/password');
const responseUtil = require('../../utilities/response');
const redisUtil = require('../../utilities/redis');
const mailUtil = require('../../utilities/mail');
const authenticationService = require('./authenticationService');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(new Date());

    const user = await authenticationService.findUserByEmail(email);
    if (!user) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.loginFailed);
    }
    console.log(new Date());

    const isPassword = await passwordUtil.comparePasswords(password, user.password);
    if (!isPassword) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.loginFailed);
    }
    console.log(new Date());
    const token = await redisUtil.loginSession({ id: user.id }, true);
    responseUtil.successResponse(res, messageUtil.login, {
      token: token

    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return responseUtil.badRequestErrorResponse(res, messageUtil.badResponseToken);
    }
    await redisUtil.logoutSession(token);
    responseUtil.successResponse(res, messageUtil.logout);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const signupUnique = await authenticationService.ifEmailExist(email);
    if (signupUnique == null) {
      const passwordHash = await passwordUtil.generateHash(password);

      await authenticationService.signup({
        name: name,
        email: email,
        password: passwordHash
      });

      await mailUtil.sendMail(email, password);

      responseUtil.successResponse(res, messageUtil.userAdded);
    } else {
      responseUtil.badRequestErrorResponse(res, messageUtil.userAlreadyExist);
    }
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
