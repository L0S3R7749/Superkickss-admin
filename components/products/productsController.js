const express = require('express');
const apicaller = require('../../public/js/apiCaller');

const router = express.Router();
const services = require('./productsService');

router.get('/', (req,res,next)=>{
    apicaller.callApi(`products/paramsApi?page=${req.query.page}`,'GET',null)
        .then(function(responseData) {
            res.render('./homepage/index',{
                title: 'Products', 
                body: '../products/products', 
                home: '/products?',
                products: responseData.data.products, 
                current: responseData.data.current, 
                pages: responseData.data.pages})
        })
        .catch(err => {
            res.send(err);
        });
})

router.get('/detail', (req, res, next)=>{
    apicaller.callApi(`products/api?id=${req.query.id}`, 'GET', null)
        .then(function (productData) {
            res.render('./homepage/index', {
                title: 'Product Detail',
                body: '../products/_detail',
                product: productData.data
            })
        })
        .catch(err => {
            res.send(err);
        });
})

router.get('/search', (req, res, next)=>{
    apicaller.callApi(`products/paramsApi?search=${req.query.search}&page=${req.query.page}`,'GET',null)
        .then(function (responseData) {
            res.render('./homepage/index', {
                title: 'Products',
                body: '../products/products',
                home: `/products/search?search=${req.query.search}&`,
                products: responseData.data.products, 
                current: responseData.data.current, 
                pages: responseData.data.pages
            })
        })
        .catch(err => {
            res.send(err);
        });
})

router.post('/api', services.create);
router.get('/api', services.find);
router.put('/api/:id', services.update);
router.delete('/api/:id', services.delete);

router.get('/paramsApi', services.list);

module.exports = router;