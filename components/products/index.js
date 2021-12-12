const controller = require('./productsController');
const upload = require('../../middlewares/multer');
const { cloudinaryUpload, cloudinaryDelete } = require('../../middlewares/cloudinary');
const express = require('express');
const router = express.Router();

//Product List
router.get('/',controller.list);
router.delete('/:id', controller.removeProduct);

//Search and Filter
router.get('/search', controller.search);

//Create New Product
router.get('/create', controller.addProductPage);
router.post('/create',
    upload.array("images", 5),
    cloudinaryUpload.multiple,
    controller.addProduct
);

//Product detail
router.get('/detail', controller.productDetail);


module.exports = router;