const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");

const homepageRouter = require("./homepage/");
const authRouter = require("./auth/");
const productRouter = require("./products/");
const orderRouter = require("./orders/");
const userRouter = require("./users/");

// Cho nay phai co check auth, nhung bay h no bug cmnr, nen de vay thoi
router.use("/auth",  authRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders",orderRouter);
// Dummy bug here, please locate this route LASTEST, it will match all route while redirecting.
router.use("/", homepageRouter);

module.exports = router;
