module.exports.home = (req,res,next)=>{
    res.render('./homepage/index',{title: 'Superkickss-Admin', body: '../../views/dashboard/dashboard'});
}