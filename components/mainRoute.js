const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");

const homepageRouter = require("./homepage/");
const authRouter = require("./auth/");
const productRouter = require("./products/");
const orderRouter = require("./orders/");
const userRouter = require("./users/");

router.use("/auth",  authRouter);
router.use("/products", checkAuth.isAuthenticated, productRouter);
router.use("/orders", checkAuth.isAuthenticated, orderRouter);
router.use("/users", checkAuth.isAuthenticated, userRouter);
// Dummy bug here, please locate this route LASTEST, it will match all route while redirecting.
router.use("/", homepageRouter);

module.exports = router;
