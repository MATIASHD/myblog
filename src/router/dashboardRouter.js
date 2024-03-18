const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard/dashboardController');
const usersDashboardController = require('../controller/dashboard/usersDashboardController');
const articleDashboardController = require('../controller/dashboard/articlesDashboardController');

router.get('/dashboard', dashboardController);
router.get('/dashboard/users', usersDashboardController);
router.get('/dashboard/article', articleDashboardController);

module.exports = router;