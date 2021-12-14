
//this router is temporary
module.exports = {
    list: (req,res)=>{
        res.render('./homepage/index',{title: 'Admins',body: '../auth/admins'});
    }

}