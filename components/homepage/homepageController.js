const services = require("./homepageService");

module.exports.home = (req,res,next)=>{
    res.render('./homepage/index',{title: 'Superkickss-Admin', body: '../../views/dashboard/dashboard'});
}

module.exports.topten = async (req, res, next) => {
    try {
        const top_ten_best_seller = await services.top_ten_best_seller();
        res.status(200).send({
            top_ten_best_seller: top_ten_best_seller,
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}