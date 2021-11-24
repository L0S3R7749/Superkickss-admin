const express = require('express');

const router = express.Router();

const services = require('./productsService');

router.get('/', services.product_detail);

router.get('/add-product', services.add_product);

module.exports = router;