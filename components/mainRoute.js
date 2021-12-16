const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");

const homepageRouter = require("./homepage/");
const authRouter = require("./auth/");
const productRouter = require("./products/");
const orderRouter = require("./orders/");
const userRouter = require("./users/");
const adminRouter = require("./admins/");

router.use("/auth",  authRouter);
router.use("/products", checkAuth.checkAuthentication, productRouter);
router.use("/orders", checkAuth.checkAuthentication, orderRouter);
router.use("/users", checkAuth.checkAuthentication, userRouter);
router.use("/admins", checkAuth.checkAuthentication,adminRouter);

router.use("/", checkAuth.checkAuthentication, homepageRouter);

module.exports = router;
