const express = require('express');
const router = express.Router();

/* GET home controller */
const productController = require('./productsController');
const detailController = require('./productDetailController');
//router.get('/',controller.products);
router.use('/',productController);
// router.use('/detail',detailController);

module.exports = router;