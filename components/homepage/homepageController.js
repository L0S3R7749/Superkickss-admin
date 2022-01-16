const services = require("./homepageService");

module.exports.home = async (req,res,next)=>{
    const top_ten_best_seller = await services.top_ten_best_seller();
    // console.log(top_ten_best_seller);

    res.render('./homepage/index',{title: 'Superkickss-Admin', body: '../../views/dashboard/dashboard'});
}