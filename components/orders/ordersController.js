// module.exports.orders = (req,res,next)=>{
//     res.render('./homepage/index',{title: 'homepage', body: '../../views/orders/orders'});
// }

const express = require('express');
const services = require('./ordersService');

const router = express.Router();

router.get("/",(req,res,next)=>{
    res.render('./homepage/index',{title: 'Order', body: '../orders/orders'});
})

router.get("/detail",(req,res,next)=>{
    res.render('./homepage/index',{title: 'Detail',body: '../orders/detail'});
})

module.exports = router;