const express = require('express');
const router = express.Router();

const articleController = require('../controller/articleController');
const allArticleController = require('../controller/allArticleController')

router.get('/article/:id', articleController);
router.get('/article', allArticleController);

module.exports = router;