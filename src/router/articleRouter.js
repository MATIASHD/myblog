const express = require('express');
const router = express.Router();

const { getCreate, postCreate, getRead, getAllRead, putUpdate, postDel, getAllReadPanel, getEditPost }  = require('../controller/article/articleController');
const autor = require('../middleware/expressValidatorMiddleware');
//multer
const uploadImg = require('../middleware/imageUploadMiddleware');

//Article CRUD
//CREATE
router.get('/createpost', getCreate);
router.post('/createpost', uploadImg.single('image'), postCreate);

//READ
router.get('/article/:id', getRead);
router.get('/articlespanel', getAllReadPanel);
router.get('/articles', getAllRead);

//UPDATE
router.get('/editpost/:id', getEditPost);
router.put('/editpost/:id', uploadImg.single('image'), putUpdate);

//DELETE
router.delete('/deletepost/:id', postDel);

module.exports = router;