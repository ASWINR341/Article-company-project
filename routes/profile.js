'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { update, follow, unfollow, getFollowers } = require('../modules/profile/profileController');

router.put('/', update);
router.put('/follow/:followId', follow);
router.put('/unfollow/:followId', unfollow);
router.get('/followers', getFollowers);

module.exports = router;
