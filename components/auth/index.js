const express = require('express');
const router = express.Router();

const controller = require('./authController');

router.use('/', controller);


module.exports = router;
