//Product Item Model
const apicaller = require('../../public/js/apiCaller');
const Product = require('../../models/schema/Product');
const cloudinary = require('../../middlewares/cloudinary');

//create and save new
exports.product_create_get = (req, res) => {
    res.render("./products/addform", {
        title: 'New product',
        product: new Product()
    });
}

exports.product_create_post = async (req, res) => {
    if (!req.body) {
        res.redirect('/create');
        return;
    }
    const uploadSimple = async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path); // must be a multiple uploader, but not now :))
            return {
                url: result.secure_url,
                priority: 0,
                cloudinary_id: result.public_id
            };
        } catch {
            console.log('Failed to upload');
            res.redirect('/create');
            return;
        }
    }
    
    const result = await uploadSimple(req, res);
    const details = [];
    const tags = [];

    // BUGS HERE
    //
    //
    // if (req.body.size != undefined && req.body.quantity != undefined) {
    //     details = req.body.size.map((x, i) => {
    //         return { size: x, quantity: req.body.quantity[i]}
    //     })
    // }
    // if (req.body.tag != undefined) {
    //     tags = req.body.tag.map(x => {
    //         return { tag: x }
    //     })
    // }

    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description || "No description",
        SKU: req.body.SKU,
        details: details,
        images: [result],  
        category: req.body.category,
        tags: tags,
    });

    try {
        const newProduct = await product.save()
        console.log(newProduct);
        res.redirect(`products/${newProduct.id}`);
    } catch (error) {
        if (product.images != null) {
            const destroyes = product.images.map(async (i) => {
                await cloudinary.uploader.destroy(i.cloudinary_id);
            });
            Promise.all(destroyes)
                .catch(err => console.log(err));
        }
        console.log('Failed to create new product');
        res.redirect('/create');
    }    
}

exports.create = (req, res) => {
    //validate req
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    //new
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        SKU: req.body.SKU,
        details: req.body.details,
        //images:req.body.images,
        category: req.body.category,
        tags: req.body.tags,

    });

    //save in dtb
    product.save(product)
        .then(data => {
            //res.send(data);
            res.redirect('/addform')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrieve and return all/single
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Product.findById(id)
            .then(data => {
                if (!data)
                    res.status(400).send({message : "Not found product with id " + id});
                else
                    res.send(data);
            })
            .catch(err=>{
                res.status(500).send({message:err.message || "Error retrieving product with id " + id});
            });
    }
    else {
        Product.find()
            .then(data => {
                res.send(data);
            })
            .catch(err=>{
                res.status(500).send({message:err.message || "Error occurred while retrieving product information!"});
            });
    }
}

//Update a new identified by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Data to update cannot be empty"
            });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: `Cannot update product with id ${id}. Maybe product not found!`
                });
            else
                res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while updating product information"
            });
        });
}

//Delete with specified id in req
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: `Cannot delete product with id ${id}. Maybe product not found!`
                })
            else
                res.send({
                    message: "Product was deleted successfully!"
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error occurred while delete product id ${id}`
            })
        });
}

exports.list = (req, res) => {
    let perPage=9;
    let page= (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page : 1;
    console.log(page);
    let myquery = {};
    if (req.query.search) {
        myquery.$or = [
            {"name" : {$regex : req.query.search, $options : 'i'}},
            {"description" : {$regex : req.query.search, $options : 'i'}},
        ];
    }
    Product.find(myquery)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.find(myquery).countDocuments((err, count) => { 
                if (err) return next(err);
                console.log(count);
                res.send({products: products,
                            current: page, pages: Math.ceil(count/perPage)});
            });
        });
}

exports.add_product = (req, res) => {
    res.render('./products/addform');
}