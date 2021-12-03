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
    const id = req.user.id;
    const data = await profileService.getFollowers(id);
    console.log(data);
    responseUtil.successResponse(res, messageUtil.followersFetched, {
      data
    });
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const name = req.body.name;
    const bio = req.body.bio;
    const image = req.files.image;

    const uploadPath = '/uploads/' + image.name;

    await image.mv(appRoot + uploadPath);

    await profileService.update({
      id: id,
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
    const followerId = req.user.id;
    console.log(followerId);
    const followingId = req.params.followId;
    const followTrue = await profileService.ifFollow(followerId, followingId);
    if (followTrue == null) {
      await profileService.follow({
        followerId,
        followingId
      });
      responseUtil.successResponse(res, messageUtil.follow);
    } else {
      responseUtil.badRequestErrorResponse(res, messageUtil.userError);
    }
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};

exports.unfollow = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.followId;
    await profileService.unfollow({
      followerId,
      followingId
    });
    responseUtil.successResponse(res, messageUtil.unfollow);
  } catch (ex) {
    responseUtil.serverErrorResponse(res, ex);
  }
};
