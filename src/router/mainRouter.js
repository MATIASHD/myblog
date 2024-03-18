const express = require('express');
const router = express.Router();

const main = require('../controller/mainController');
const aboutmeController = require('../controller/aboutmeController');
const read = require('../api/newsApi');

router.get('/', main);
router.get('/aboutme', aboutmeController);
//router.get('/news', read);


module.exports = router;