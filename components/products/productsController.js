const express = require('express');
const Product = require('../../models/schema/Product');
const apicaller = require('../../public/js/apiCaller');

const router = express.Router();

// router.get('/', (req,res,next)=>{
//     apicaller.callApi(`products/api?page=${req.query.page}`,'GET',null)
//         .then(function(response) {
//             res.render('./homepage/index',{title: 'Products', body: '../products/products', products: response.data});
//         })
//         .catch(err => {
//             res.send(err);
//         });
// })


const services = require('./productsService');

router.get('/api/:page',services.pagination);
router.post('/api', services.create);
router.get('/api', services.find);
router.put('/api/:id', services.update);
router.delete('/api/:id', services.delete);

// router.get('/api/:page',services.pagination); 


module.exports = router;