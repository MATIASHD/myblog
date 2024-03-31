const express = require('express');
const router = express.Router();
//users
const { getCreateUser, postCreateUser, getProfile, getAllUsers, getLogout, putUpdateUser, deleteUser, getEditUser, getResetPassword, putResetPassword } = require('../controller/users/userController');
const { getCreate, postCreate, getRead, getAllRead, putUpdate, postDel, getEditPost }  = require('../controller/article/articleController');
const { dashboard, getError } = require('../controller/dashboard/dashboardController');
//Middleware
const { authMiddleware } = require('../middleware/authMiddleware');
//Multer
const uploadImg = require('../middleware/imageUploadMiddleware');

//main dashboard
router.get('/',authMiddleware, dashboard);
router.get('/users',authMiddleware, getAllUsers);
router.get('/user/register',authMiddleware, getCreateUser);
router.post('/user/register',uploadImg.single('image'), authMiddleware, postCreateUser);
router.get('/user/profile/', authMiddleware, getProfile);
router.get('/user/update/:id', authMiddleware, getEditUser);
router.put('/user/update/:id', authMiddleware, uploadImg.single('image'), putUpdateUser);
router.delete('/user/delete/:id', authMiddleware, deleteUser);
router.get('/user/resetpassword', authMiddleware, getResetPassword );
router.put('/user/resetpassword', authMiddleware, putResetPassword);
router.get('/user/logout', authMiddleware, getLogout);

//articles
router.get('/articles', authMiddleware, getAllRead);
router.get('/article/create', authMiddleware, getCreate);
router.post('/article/create', authMiddleware,uploadImg.single('image'), postCreate);

router.get('/article/:id', authMiddleware, getRead);
router.get('/article/update/:id', authMiddleware, getEditPost);
router.put('/article/update/:id', authMiddleware, uploadImg.single('image'), putUpdate);
router.delete('/article/delete/:id', authMiddleware, postDel);


module.exports = router;