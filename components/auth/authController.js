const express = require("express");
const upload = require("../../middlewares/multer");
const passport = require("../../middlewares/passport");
const checkAuth = require("../../middlewares/check-auth");
const router = express.Router();

// Form dang nhap
router.get("/login", (req, res) => {
  res.render("./auth/login", { title: "Login", message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = router;
