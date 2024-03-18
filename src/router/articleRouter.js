const { express } = require('express');
const { router } = express.Router();

const { postCreate, postRead, putUpdate, deleteDel } = require('../controller/article/articleController');

const { articleController } = require('../controller/articleController');
const { allArticleController }  = require('../controller/allArticleController')
const { validateRegister } = require('../middleware/expressValidatorMiddleware');
//multer
const { mediaUpload } = require('../middleware/UserMulterMiddleware');
//Article CRUD
//CREATE
router.get('/createpost', createpostController);
router.post('/createpost', validateRegister, mediaUpload.single('image'), postCreate);

//READ
router.get('/article/:id', articleController);
router.get('/article', allArticleController);

//UPDATE
router.put('/editpost/:id', validateRegister, mediaUpload.single('image'), putUpdate);

//DELETE
router.delete('/deletepost/:id', deleteDel);

module.exports = router;