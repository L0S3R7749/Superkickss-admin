const express = require('express');
const axios = require('axios');
const apicaller = require('../../public/js/apiCaller');

const router = express.Router();

// router.get('/', (req,res,next)=>{
//     apicaller.callApi('products/api','GET',null)
//         .then(function(response) {
//             res.render('./homepage/index',{title: 'Products', body: '../../views/products/_detail', products: response.data});
//         })
//         .catch(err => {
//             res.send(err);
//         });
// })

router.get('/',(req,res,next)=>{
    res.render('./homepage/index',{title: 'detail',body: '../../views/products/_detail'});
})