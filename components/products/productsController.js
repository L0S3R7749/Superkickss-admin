const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req,res,next)=>{
    axios.get('http://localhost:5000/products/api')
        .then(function(response) {
            res.render('./homepage/index',{title: 'homepage', body: '../../views/products/products', products: response.data});
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