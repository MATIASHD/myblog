const express = require('express');
const router = express.Router();

const { getLogin, postLogin } = require('../controller/users/userController');
const { getMain,
    getArticle,
    getArticles,
    getResetPassword,
    getError } = require('../controller/main/main');
const loginValidator  = require('../middleware/validator/loginValidator');
const guestMiddleware = require('../middleware/guestMiddleware');

router.get('/', getMain); //Main
router.get('/article/:id', getArticle); //Article
router.get('/articles', getArticles);
router.get('/resetpassword', getResetPassword); //Reset password
router.get('/error', getError); //Error

router.get('/login', guestMiddleware, getLogin); //Login
router.post('/login', loginValidator, postLogin); //Login

module.exports = router;
