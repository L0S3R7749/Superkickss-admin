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

module.exports.revenue = async (req, res, next) => {
    try {
        let interval_string = ""
        if (req.query.interval) {
            console.log(req.query.interval)
            interval_string = req.query.interval;
        }
        const revenue_by_interval = await services.revenue(interval_string);
        res.status(200).send({
            revenue_by_interval: revenue_by_interval
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}