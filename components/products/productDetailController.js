const express = require('express');

const router = express.Router();

const services = require('./productsService');

router.get('/add-product', services.add_product);

module.exports = router;