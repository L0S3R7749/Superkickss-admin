const express = require('express');
const router = express.Router();

const controller = require('./usersController');

router.use('/', controller);

module.exports = router;
