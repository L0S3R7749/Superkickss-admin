const express = require("express");
const apicaller = require("../../public/js/apiCaller");
const upload = require("../../middlewares/multer");
const passport = require("../../middlewares/passport");
const checkAuth = require('../../middlewares/check-auth');
const router = express.Router();


// Form dang nhap
router.get('/login', checkAuth.isNotAuthenticated, (req, res) => {
    res.render('./homepage/index', {title: 'Login', body: '../auth/login'});
});

router.post('/login', 
    checkAuth.isNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;