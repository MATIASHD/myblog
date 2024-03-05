const express = require('express');
const router = express.Router();

const articleController = require('../controller/article/articleController');

router.get('/article', articleController);

module.exports = router;