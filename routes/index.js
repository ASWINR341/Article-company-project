'use strict';

const express = require('express');
const { getUsers } = require('../modules/profile/profileController');
const router = express.Router();
const authentication = require('./authentication');
const profile = require('./profile');
const article = require('./article');
const favorite = require('./favorite');
const {
  userTokenCheck
} = require('../middleware/authentication/authenticationController');

router.get('/details', getUsers);
router.use('/auth', authentication);
router.use(userTokenCheck);
router.use('/profile', profile);
router.use('/article', article);
router.use('/favorite', favorite);
module.exports = router;
