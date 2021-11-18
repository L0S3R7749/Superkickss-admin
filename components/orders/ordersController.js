module.exports.orders = (req,res,next)=>{
    res.render('./homepage/index',{title: 'homepage', body: '../../views/orders/orders'});
}