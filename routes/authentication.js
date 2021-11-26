'use strict';

const express = require('express');
const router = express.Router();
const validator = require('../middleware/validation/validator');
const { signup, login, logout } = require('../modules/authentication/authenticationController');
const verifyRequest = require('../middleware/validation/verifyRequest');

router.post('/signup', validator('signup'), verifyRequest, signup);
router.post('/login', validator('login'), verifyRequest, login);
router.post('/logout', logout);

module.exports = router;
