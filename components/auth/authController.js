const express = require("express");
const apicaller = require("../../public/js/apiCaller");
const upload = require("../../middlewares/multer");
const passport = require("../../middlewares/passport");
const checkAuth = require('../../middlewares/check-auth');
const router = express.Router();


// Form dang nhap
router.get('/login', checkAuth.isNotAuthenticated, (req, res) => {
    res.render('./auth/login', {title: 'Login', message: req.flash('error')});
    console.log(req.flash('error'));
});

router.post('/login', 
    checkAuth.isNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
);

router.get('/logout', (req, res) => {
    console.log('caohaisil');
    req.logOut();
    res.redirect('/auth/login');
})

module.exports = router;