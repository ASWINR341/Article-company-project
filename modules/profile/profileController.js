'use strict';

const messageUtil = require('../../utilities/message');
const responseUtil = require('../../utilities/response');
const profileService = require('./profileService');
const appRoot = require('app-root-path');
// const {user} = require('../../middleware/authentication/authenticationController')

exports.getUsers = async (req, res, next) => {
  try {
    const mongoUserData = await profileService.getUsers();

    responseUtil.successResponse(res, messageUtil.userFetched, {
      mongoUserData
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const _id = req.user._id;
    const data = await profileService.getFollowers(_id);
    responseUtil.successResponse(res, messageUtil.followersFetched, {
      data
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.user;
    const name = req.body.name;
    const bio = req.body.bio;
    const image = req.files.image;

    const uploadPath = '/uploads/' + image.name;

    await image.mv(appRoot + uploadPath);

    await profileService.update({
      _id: _id,
      name: name,
      bio: bio,
      image: uploadPath
    });
    responseUtil.successResponse(res, messageUtil.adminUpdated);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.follow = async (req, res) => {
  try {
    const _id = req.user._id;
    const followId = req.params.followId;
    await profileService.followers({
      _id: _id,
      followId: followId
    });
    await profileService.following({
      _id: _id,
      followId: followId
    });
    responseUtil.successResponse(res, messageUtil.follow);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.unfollow = async (req, res) => {
  try {
    const _id = req.user._id;
    const followId = req.params.followId;
    await profileService.unfollowers({
      _id: _id,
      followId: followId
    });
    await profileService.unfollowing({
      _id: _id,
      followId: followId
    });
    responseUtil.successResponse(res, messageUtil.unfollow);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
