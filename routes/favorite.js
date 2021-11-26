'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const { createFavorite, deleteFavorite, showFavorite } = require('../modules/favorite/favoriteController');
router.post('/', createFavorite);
router.delete('/:favoriteId', deleteFavorite);
router.get('/', showFavorite);

module.exports = router;
