const express = require('express');
const router = express.Router();

const controller = require('./ordersController');

router.get("/", controller.get_all_orders);

router.get("/search", controller.search);

router.get("/detail/:id", controller.get_order_detail);

router.get("/detail",(req,res,next)=>{
    res.render('./homepage/index',{title: 'Detail',body: '../orders/detail'});
})

module.exports = router;
