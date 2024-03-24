const express = require('express');
const router = express.Router();

//multer
const uploadImg = require('../middleware/imageUploadMiddleware');
const { getCreateUser, postCreateUser, getProfile, getAllUsers, getUpdateUser, putUpdateUser, deleteUser, getLogin, postLogin } = require('../controller/users/userController');


//Login
router.get('/login', getLogin);
router.post('/login', postLogin);

//Register
router.get('/register', getCreateUser);
router.post('/register', uploadImg.single('image'), postCreateUser);

//profile
router.get('/users', getAllUsers);
router.get('/user/:id', getProfile)
//update profile
router.put('/user/:id', putUpdateUser);

//delete profile
router.delete('user/:id', deleteUser);

//Reset Password
//router.get('/resetPassword', resetPasswordController);

module.exports = router;