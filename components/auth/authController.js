module.exports.accounts = (req,res,next) => {
    res.render('./homepage/index',{title: 'Accounts', body: '../../views/auth/accounts'});
}