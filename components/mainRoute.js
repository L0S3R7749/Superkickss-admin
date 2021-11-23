const express = require('express');
const router = express.Router();

const homepageRouter = require('./homepage/index');
const authRouter = require('./auth/index');
const productRouter = require('./products/index');
const productDetailRouter = require('./products/detailIndex');
const orderRouter = require('./orders/index');

router.use('/', homepageRouter);
router.use('/auths', authRouter);
router.use('/products',productRouter);
router.use('/product-detail', productDetailRouter);
router.use('/orders',orderRouter);

module.exports = router;
