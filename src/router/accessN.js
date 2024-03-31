const express = require('express');
const router = express.Router();

//multer
const uploadImg = require('../middleware/imageUploadMiddleware');
const { getCreateUser, postCreateUser, getProfile, getAllUsers, getLogout, putUpdateUser, deleteUser, getLogin, postLogin } = require('../controller/users/userController');
const { guestMiddleware } = require('../middleware/guestMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');

//Login
router.get('/login', getLogin);
router.post('/login', postLogin);

//Register
router.get('/register', getCreateUser);
router.post('/register', uploadImg.single('image'), postCreateUser);

//profile
router.get('/users', getAllUsers);
router.get('/user/:id',getProfile)

//loguot
router.get('/logout', getLogout);
//update profile
router.put('/user/:id', uploadImg.single('image'), putUpdateUser);

//delete profile
router.delete('user/:id', deleteUser);

//Reset Password
//router.get('/resetPassword', resetPasswordController);

module.exports = router;