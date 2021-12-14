const express = require('express');
const router = express.Router();
const controller = require('./adminsController');
// const checkAuth = require('../../middlewares/check-auth');


router.use('/', controller.list);

module.exports = router;
