const Product = require('../../models/schema/Product');

exports.list = (page=1,perPage=9) => {
    return Product
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage);
}

exports.countByQuery = (searchString) => {
    return Product
        .countDocuments(searchString ? {"name" : {$regex : searchString, $options : 'i'}} : {});
}

exports.findTargetProduct = (id) => {
    return Product.findById(id);
}

exports.search_list = (searchString,page=1, perPage=9) => {
    let myquery = {};
    myquery = {"name" : {$regex : searchString, $options : 'i'}};
    return Product
        .find(myquery)
        .skip((perPage * page) - perPage)
        .limit(perPage);
}

exports.add_product = (requestBody, details, images, tags) => {
    const newProduct = new Product({
        name: requestBody.name,
        brand: requestBody.brand,
        price: parseInt(requestBody.price),
        description: requestBody.description || "No description",
        SKU: requestBody.SKU,
        details: details,
        images: images,  
        category: { gender: requestBody.gender, type: requestBody.type },
        tags: tags,
    });
    return newProduct.save();
}

exports.remove_product = (id) => Product.findByIdAndDelete(id);

exports.update_product = (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
        useFindAndModify: false,
        returnDocument: 'after'
    });
}