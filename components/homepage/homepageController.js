module.exports.home = (req,res,next)=>{
    res.render('./homepage/index',{title: 'homepage', body: '../../views/dashboard/dashboard'});
}