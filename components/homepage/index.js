const express = require('express');
const router = express.Router();

/* GET home controller */
const controller = require('./homepageController');

router.get('/',controller.home);

module.exports = router;
