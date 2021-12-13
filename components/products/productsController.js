const Product = require('../../models/schema/Product');
const productServices = require('./productsService');
const { cloudinaryUpload, cloudinaryDelete } = require('../../middlewares/cloudinary');

module.exports = {
  list: async (req, res) => {
    try {
      const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
      const productList = await productServices.list(page);
      const countAll = await productServices.countByQuery();
      const pages = Math.ceil(countAll / 9);

      res.render('./homepage/index', {title: 'Products', body: '../products/products', products: productList, pages: pages, current: page, home: '/products?'});
    } catch (err) {
      console.log(err.message);
    }
  },

  search: async (req, res) => {
    try {
      const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
      const productList = await productServices.search_list(req.query.search,page);
      const countAll = await productServices.countByQuery(req.query.search);
      const pages = Math.ceil(countAll / 9);

      res.render('./homepage/index', {title: 'Search Results', body: '../products/products', products: productList, pages: pages, current: page, home: `/products/search?search=${req.query.search}&`})
    } catch (err) {
      console.log(err.message);
    }
  },

  addProductPage: async (req, res) => {
    res.render('./homepage/index', {title: 'Add Product', body: '../products/_form', product: new Product(), nameBtn: 'ADD'});
  },

  addProduct: async (req, res) => {
    try {
      if (!req.body)
        return res.redirect('/products/create');
      
      if (!res.locals.images)
        return res.redirect('/products/create');
      
      const images = res.locals.images.map(image => {
        return {
          url: image.secure_url,
          cloudinary_id: image.public_id
        }
      });

      let details = [];
      if (typeof(req.body.size) === "string") {
        details.push({ size: parseInt(req.body.size), quantity: parseInt(req.body.quantity) });
      } else if (Array.isArray(req.body.size)) {
        details = req.body.size.map((s, index) => {
            return {
                size: parseInt(s),
                quantity: parseInt(req.body.quantity[index])
            };
        });
      }

      let tags = [];
      if (typeof(req.body.tag) === "string") {
        tags.push({ name: req.body.tag })
      } else if (Array.isArray(req.body.tag)) {
        tags = req.body.tag.map((t) => {
            return {
                name: t
            }
        });
      }

      const newProduct = await productServices.add_product(req.body, details, images, tags);
      console.log(newProduct);
      res.redirect(`/products/detail?id=${newProduct._id}`);

    } catch (err) {
      console.log(err);
      if (res.locals.images != null) {
        try {
          await cloudinaryDelete.multiple(req, res, null);
        } catch {
          console.log('Failed to destroy image');
        }
      }
      res.redirect('/products/create');
    }
  },

  productDetail: async (req, res) => {
    try {
      const idTarget = req.query.id;
      const targetProduct = await productServices.findTargetProduct(idTarget);
    
      res.render('./homepage/index', {title: 'Product Details', body: '../products/_form', product: targetProduct, nameBtn: 'UPDATE'});
    } catch (err) {
      console.log(err);
    }
  },

  removeProduct: async (req, res) => {
    try {
      const id = req.params.id;
      await productServices.remove_product(id);
      res.status(200).send({message: 'Remove successfully'});
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: 'Error occurred while removing product..'});
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.productId;
      const updateData = req.body;
      await productServices.update_product(id, updateData);
      res.redirect(`/products/detail?id=${id}`);
    } catch (err) {
      console.log(err);
    }
  },
}