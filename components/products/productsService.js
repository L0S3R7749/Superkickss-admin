//Product Item Model
const Product = require('../../models/schema/Product');

//create and save new
exports.create = (req,res)=>{
    //validate req
    if (!req.body) {
        res.status(400).send({message:"Content cannot be empty!"})
        return;
    }

    //new
    const product = new Product({
        name:req.body.name,
        brand:req.body.brand,
        price:req.body.price,
        description:req.body.description,
        SKU:req.body.SKU,
        details:req.body.details,
        //images:req.body.images,
        category:req.body.category,
        tags:req.body.tags,
        
    });

    //save in dtb
    product.save(product)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Some error occurred while creating a create operation"});
            });
}

//retrieve and return all/single
exports.find = (req,res)=>{
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
                    res.status(500).send({message:"Error retrieving product with id " + id});
                })

    } else {
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
exports.update = (req,res)=>{
    if (!req.body) {
        return res
            .status(400)
            .send( {message : "Data to update cannot be empty"});
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
            .then(data => {
                if (!data)
                    res.status(404).send({message:`Cannot update product with id ${id}. Maybe product not found!`});
                else
                    res.send(data);
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Error occurred while updating product information"});
            });
}

//Delete with specified id in req
exports.delete = (req,res)=>{
    Product.findByIdAndDelete(req.params.id)
            .then(data => {
                if (!data)
                    res.status(404).send({message:`Cannot delete product with id ${id}. Maybe product not found!`})
                else
                    res.send({message:"Product was deleted successfully!"});
            })
            .catch(err => {
                res.status(500).send({message:err.message || `Error occurred while delete product id ${id}`})
            });
}