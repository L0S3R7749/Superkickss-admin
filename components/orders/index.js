const express = require('express');
const router = express.Router();

const controller = require('./ordersController');

router.use('/', controller);

module.exports = router;
