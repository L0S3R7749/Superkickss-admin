/*module.exports.products = (req,res,next) => {
    
}*/

const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('./homepage/index',{title: 'homepage', body: '../../views/products/products'});
})

const services = require('./productsService');

router.post('/api', services.create);
router.get('/api', services.find);
router.put('/api/:id', services.update);
router.delete('/api/:id', services.delete);

module.exports = router;