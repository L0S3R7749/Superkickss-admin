const express = require('express');
const router = express.Router();

const controller = require('./usersController');

//User List
router.get('/', controller.get_users_list);
router.post('/', controller.userAccountAction);

//Search and Filter
router.get('/search', controller.search);

//User detail
router.get('/detail/:id', controller.get_user_detail);
router.post('/detail/:id', controller.edit_user)

//Local user info
router.get('/userinfo/:id',controller.get_local_user_info);

module.exports = router;
