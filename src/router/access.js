const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController');
const resetPasswordController = require('../controller/resetPasswordController');
const registerController = require('../controller/registerController');
const postLoginController = require('../controller/postLoginController');
const postRegisterController = require('../controller/postRegisterController');


//Login
router.get('/login', loginController);
router.post('/login', postLoginController);

//Register
router.get('/register', registerController);
router.post('/register', postRegisterController);

//Reset Password
router.get('/resetPassword', resetPasswordController);

module.exports = router;