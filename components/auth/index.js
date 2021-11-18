const express = require('express');
const router = express.Router();

const controller = require('./authController');

router.get('/',controller.accounts);


module.exports = router;
