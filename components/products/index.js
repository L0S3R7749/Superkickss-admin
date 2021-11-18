const express = require('express');
const router = express.Router();

/* GET home controller */
const controller = require('./productsController');

router.get('/',controller.products);

module.exports = router;
