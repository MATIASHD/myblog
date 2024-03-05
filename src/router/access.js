const express = require('express');
const router = express.Router();

const articleController = require('../controller/article/articleController');
const resetPasswordController = require('../controller/article/articleController');
const registerController = require('../controller/article/articleController');


router.get('/login', articleController);
router.get('/resetPassword', resetPasswordController);
router.get('/register', registerController);


module.exports = router;