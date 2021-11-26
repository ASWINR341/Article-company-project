'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { createComment, showComment, deleteComment, updateComment } = require('../modules/comment/commentController');

router.post('/', createComment);
router.get('/', showComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
