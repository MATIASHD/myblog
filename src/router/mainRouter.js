const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { guestMiddleware } = require('../middleware/guestMiddleware');
const { getLogin, postLogin } = require('../controller/users/userController');
const { getMain, getArticle, getArticles, getResetPassword, getError } = require('../controller/main/main');
const  loginValidator  = require('../middleware/validator/loginValidator');
router.get('/', getMain);
//article
router.get('/article/:id', getArticle);
//article list
router.get('/articles', getArticles);
//about me
router.get('/aboutme', getMain);
//reset password
router.get('/resetpassword', getResetPassword);
//page error
router.get('/error', getError);
//contacto
//Iniciar sesion
router.get('/login', getLogin);
router.post('/login', loginValidator, postLogin);


//galeria

module.exports = router;