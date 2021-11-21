const express = require('express');
const router = express.Router();

/* GET home controller */
const controll = require('./productsController');

//router.get('/',controller.products);
router.use('/',controll);

module.exports = router;