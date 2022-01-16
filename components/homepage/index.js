const express = require('express');
const router = express.Router();
const checkAuth = require('../../middlewares/check-auth');

/* GET home controller */
const controller = require('./homepageController');

router.get('/', controller.home);

router.get('/topten', controller.topten);

module.exports = router;
