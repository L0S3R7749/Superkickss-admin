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
router.get("/", service.user_list_get);

router.get("/create", service.user_create_get);

router.post("/", service.user_create_post);

router.get("/:id", service.user_detail_get);

router.get("/:id/edit", service.user_edit_get);

router.put("/:id", service.user_edit_put);

module.exports = router;
