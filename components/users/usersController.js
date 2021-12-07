const express = require("express");
const bcrypt = require("bcrypt");
const apicaller = require("../../public/js/apiCaller");
const upload = require("../../middlewares/multer");
const passport = require("../../middlewares/passport");
const checkAuth = require("../../middlewares/check-auth");
const User = require("../../models/schema/User");
const service = require("./usersService");
const router = express.Router();


// tested
// router.get("/", service.user_list_get);
router.get("/", (req,res,next)=>{
    apicaller
    .callApi(`users/paramsApi?page=${req.query.page}`, "GET", null)
    .then(function (responseData) {
      res.render("./homepage/index", {
        title: "Users",
        body: "../auth/accounts",
        home: "/users?",
        users: responseData.data.users,
        current: responseData.data.current,
        pages: responseData.data.pages,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// router.get("/create", service.user_create_get);
router.get("/create", (req,res,next)=>{
    res.render("./homepage/index", {
        title: 'New user',
        body: "../auth/_form",
        user: new User()
    });
});


router.post("/", service.user_create_post);

router.get('/paramsApi',service.user_list_get);

router.get("/:id", service.user_detail_get);

router.get("/:id/edit", service.user_edit_get);

router.put("/:id", service.user_edit_put);



module.exports = router;
