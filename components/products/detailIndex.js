const express = require('express');
const router = express.Router();

const detailController = require('./productDetailController');

router.use('/',detailController);

module.exports = router;