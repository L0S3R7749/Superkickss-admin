module.exports.home = (req,res,next)=>{
    res.render('./homepage/index',{title: 'Homepage', body: '../../views/dashboard/dashboard'});
}