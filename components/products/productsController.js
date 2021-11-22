const express = require('express');
const axios = require('axios');
const apicaller = require('../../public/js/apiCaller');

const router = express.Router();

router.get('/', (req,res,next)=>{
    apicaller.callApi('products/api','GET',null)
        .then(function(response) {
            res.render('./homepage/index',{title: 'Products', body: '../../views/products/products', products: response.data});
        })
        .catch(err => {
            res.send(err);
        });
})

const services = require('./productsService');

router.post('/api', services.create);
router.get('/api', services.find);
router.put('/api/:id', services.update);
router.delete('/api/:id', services.delete);

module.exports = router;