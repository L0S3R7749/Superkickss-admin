const express = require('express');
const router = express.Router();
const controller = require('./adminsController');

router.get('/', controller.get_admins_list);

module.exports = router;
