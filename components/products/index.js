const express = require('express');
const router = express.Router();

const controller = require('./productsController');

router.use('/',controller);

module.exports = router;