const express = require('express');
const router = express.Router();

const controller = require('./usersController');

//User List
router.get('/', controller.get_users_list);

//Search and Filter
router.get('/search', controller.search);

//User detail
router.get('/detail/:id', controller.get_user_detail);

//Local user info
router.get('/userinfo/:id',controller.get_local_user_info);

//Update User
router.get('/edit', controller.edit_user);


module.exports = router;
