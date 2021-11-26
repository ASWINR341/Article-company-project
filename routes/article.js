'use strict';

const express = require('express');
const router = express.Router();
const { createArticle, updateArticle, deleteArticle, searchArticle } = require('../modules/article/articleController');
const comment = require('./comment');

router.post('/', createArticle);
router.get('/', searchArticle);
router.put('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);
router.use('/:articleId/comment', comment);

module.exports = router;
