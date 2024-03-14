const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard/dashboardController');
const usersDashboardController = require('../controller/dashboard/usersDashboardController')

router.get('/dashboard', dashboardController);
router.get('/users', usersDashboardController);

module.exports = router;