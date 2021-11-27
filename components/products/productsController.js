const express = require('express');
const apicaller = require('../../public/js/apiCaller');
const services = require('./productsService');
const upload = require('../../middlewares/multer');

const router = express.Router();

router.get('/', (req,res,next)=>{
    apicaller.callApi(`products/api?page=${req.query.page}`,'GET',null)
        .then(function(responseData) {
            res.render('./homepage/index',{title: 'Products', body: '../products/products', products: responseData.data.products, current: responseData.data.current, pages: responseData.data.pages})
        })
        .catch(err => {
            res.send(err);
        });
})

router.get('/create', services.product_create_get);
router.post('/', upload.single("image"), services.product_create_post);

router.post('/api', services.create);
router.get('/api', services.find);
router.put('/api/:id', services.update);
router.delete('/api/:id', services.delete);

// router.get('/api/:page',services.pagination); 


module.exports = router;