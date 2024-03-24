const express = require('express');
const router = express.Router();

const { getMain } = require('../controller/main/main');

router.get('/', getMain);

module.exports = router;