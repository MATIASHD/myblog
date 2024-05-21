const express = require('express');
const router = express.Router();
const { getCreateUser,
        postCreateUser,
        getProfile,
        getAllUsers,
        getLogout,
        putUpdateUser,
        deleteUser,
        getEditUser,
        getResetPassword,
        putResetPassword } = require('../controller/users/userController');
const { getCreate,
        postCreate,
        getRead,
        getAllRead,
        putUpdate,
        postDel,
        getEditPost }  = require('../controller/article/articleController');
const { allmedia,
        createMedia,
        postCreateMedia,
        readMedia,
        updateMedia,
        putupdateMedia,
        deleteMedia } = require('../controller/galery/galeryController')
const { dashboard } = require('../controller/dashboard/dashboardController');
//Middleware
const authMiddleware = require('../middleware/authMiddleware');
const userLogged = require('../middleware/userLoggedMiddleware');
//Multer
const uploadImg = require('../middleware/imageUploadMiddleware');
//main dashboard
router.get('/dashboard/',userLogged, authMiddleware, dashboard); //DASHBOARD
router.get('/dashboard/users/', userLogged, authMiddleware, getAllUsers); //USERS LIST
router.get('/dashboard/user/register/', userLogged, authMiddleware, getCreateUser); // CREATE USER
router.post('/dashboard/user/register/', userLogged, authMiddleware, uploadImg.single('image'), postCreateUser);
router.get('/dashboard/user/profile/:id', userLogged, authMiddleware, getProfile); //READ USER
router.get('/dashboard/user/update/:id', userLogged, authMiddleware, getEditUser); //EDIT USER
router.put('/dashboard/user/update/:id', userLogged, authMiddleware, uploadImg.single('image'), putUpdateUser);
router.delete('/dashboard/user/delete/:id', userLogged, authMiddleware, deleteUser); //DELETE USER
router.get('/dashboard/user/resetpassword/', userLogged, authMiddleware, getResetPassword );
router.put('/dashboard/user/resetpassword/', userLogged, authMiddleware, putResetPassword);
router.get('/dashboard/user/logout/', userLogged, authMiddleware, getLogout);
//post
router.get('/dashboard/posts/', authMiddleware, getAllRead); //POSTS LIST
router.get('/dashboard/post/create/', authMiddleware, getCreate); //CREATE POST
router.post('/dashboard/post/create/', authMiddleware,uploadImg.single('image'), postCreate);
router.get('/dashboard/post/:id', authMiddleware, getRead); //READ POST
router.get('/dashboard/post/update/:id', authMiddleware, getEditPost); //EDIT POST
router.put('/dashboard/post/update/:id', authMiddleware, uploadImg.single('image'), putUpdate);
router.delete('/dashboard/post/delete/:id', authMiddleware, postDel); //DELETE POST
//GALERY
router.get('/dashboard/galery/',authMiddleware, allmedia); //GALERY
router.get('/dashboard/galery/create',authMiddleware, createMedia); //CREATE
router.post('/dashboard/galery/create',authMiddleware, uploadImg.single('image'), postCreateMedia); //CREATE
router.get('/dashboard/galery/read/:id',authMiddleware, readMedia); //READ
router.get('/dashboard/galery/update/:id',authMiddleware, updateMedia); //UPDATE
router.put('/dashboard/galery/update/:id',authMiddleware, uploadImg.single('image'), putupdateMedia); //UPDATE
router.delete('/dashboard/galery/delete/:id',authMiddleware, deleteMedia); //DELETE
module.exports = router;
