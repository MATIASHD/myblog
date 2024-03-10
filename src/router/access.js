const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController');
const resetPasswordController = require('../controller/resetPasswordController');
const registerController = require('../controller/registerController');
const postLoginController = require('../controller/postLoginController');



router.get('/login', loginController);
router.post('/login', postLoginController);
router.get('/resetPassword', resetPasswordController);
router.get('/register', registerController);


module.exports = router;