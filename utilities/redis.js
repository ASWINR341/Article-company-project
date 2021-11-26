'use strict';

const bluebird = require('bluebird');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const loggerUtil = require('./logger');

// returns responses using a callback function to return responses in a promise object
// redis only support callback
bluebird.promisifyAll(redis.RedisClient.prototype);

// HOST and PORT of the redis has to mention here.
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Setting a key-value pair in redis with expiry time during the login session of any user
exports.loginSession = async (userData, stayLoggedIn) => {
  const token = jwt.sign(userData, process.env.JWT_ACCESS_TOKEN_EXPIRY);

  try {
    const expiry = stayLoggedIn ? 8.64e11 : process.env.REDIS_TOKEN_EXPIRY;
    await client.setAsync(token, JSON.stringify(userData), 'EX', expiry);
    return token;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

// Checking whether the key passed is valid or not. If valid, corresponding value will be returned
exports.checkSession = async (token) => {
  try {
    const userData = await client.getAsync(token);
    return JSON.parse(userData);
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

// Deleting the redis key once the user click on logout
exports.logoutSession = async (token) => {
  try {
    await client.delAsync(token);
    return true;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

// Creating a time based otp session for multiple uses
exports.otpCreateSession = async (email, otp) => {
  try {
    await client.setAsync(email, otp, 'EX', process.env.REDIS_TOKEN_EXPIRY);
    return true;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

// Checking the otp key is valid or not. If valid the corresponding values will be provided.
exports.otpCheckSession = async (email, otp) => {
  try {
    const redisOtp = await client.getAsync(email);
    return (redisOtp === otp);
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

// Once the otp is verified, the saved key-value pair will be deleted here.
exports.otpDeleteSession = async (email) => {
  try {
    await client.delAsync(email);
    return true;
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};
