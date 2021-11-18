const express = require('express');
const router = express.Router();

/* GET home controller */
const controller = require('./ordersController');

router.get('/',controller.orders);

module.exports = router;
