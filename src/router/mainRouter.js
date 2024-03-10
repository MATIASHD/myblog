const express = require('express');
const router = express.Router();

const main = require('../controller/mainController');
const aboutmeController = require('../controller/aboutmeController');

router.get('/', main);
router.get('/aboutme', aboutmeController);


module.exports = router;