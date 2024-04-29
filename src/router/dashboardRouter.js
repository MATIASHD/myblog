const express = require('express');
const router = express.Router();
//users
const { getCreateUser, postCreateUser, getProfile, getAllUsers, getLogout, putUpdateUser, deleteUser, getEditUser, getResetPassword, putResetPassword } = require('../controller/users/userController');
const { getCreate, postCreate, getRead, getAllRead, putUpdate, postDel, getEditPost }  = require('../controller/article/articleController');
const { dashboard } = require('../controller/dashboard/dashboardController');
//Middleware
const authMiddleware = require('../middleware/authMiddleware');
const userLogged = require('../middleware/userLoggedmiddelware');
//Multer
const uploadImg = require('../middleware/imageUploadMiddleware');

//main dashboard
router.get('/dashboard', userLogged, authMiddleware, dashboard);
router.get('/dashboard/users', userLogged, authMiddleware, getAllUsers);
router.get('/dashboard/user/register', userLogged, authMiddleware, getCreateUser);
router.post('/dashboard/user/register', userLogged, authMiddleware, uploadImg.single('image'), postCreateUser);
router.get('/dashboard/user/profile/:id', userLogged, authMiddleware, getProfile);
router.get('/dashboard/user/update/:id', userLogged, authMiddleware, getEditUser);
router.put('/dashboard/user/update/:id', userLogged, authMiddleware, uploadImg.single('image'), putUpdateUser);
router.delete('/dashboard/user/delete/:id', userLogged, authMiddleware, deleteUser);
router.get('/dashboard/user/resetpassword', userLogged, authMiddleware, getResetPassword );
router.put('/dashboard/user/resetpassword', userLogged, authMiddleware, putResetPassword);
router.get('/dashboard/user/logout', userLogged, authMiddleware, getLogout);

//articles
router.get('/dashboard/posts', authMiddleware, getAllRead);
router.get('/dashboard/post/create', authMiddleware, getCreate);
router.post('/dashboard/post/create', authMiddleware,uploadImg.single('image'), postCreate);

router.get('/dashboard/post/:id', authMiddleware, getRead);
router.get('/dashboard/post/update/:id', authMiddleware, getEditPost);
router.put('/dashboard/post/update/:id', authMiddleware, uploadImg.single('image'), putUpdate);
router.delete('/dashboard/post/delete/:id', authMiddleware, postDel);


module.exports = router;
