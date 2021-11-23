const express = require('express');

const router = express.Router();

const services = require('./productsService');

router.get('/', services.product_detail);

module.exports = router;