module.exports.products = (req,res,next) => {
    res.render('./homepage/index',{title: 'homepage', body: '../../views/products/products'});
}