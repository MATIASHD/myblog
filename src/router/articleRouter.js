const express = require('express');
const router = express.Router();

const article = require('../controller/article/articleController');

router.get('article/:id', article);

module.exports = router;