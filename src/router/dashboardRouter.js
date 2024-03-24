const express = require('express');
const router = express.Router();
const { dashboard } = require('../controller/dashboard/dashboardController');

router.get('/dashboard', dashboard);

module.exports = router;