const express = require('express');
const router = express.Router();
const controller = require('./adminsController');

router.get('/', controller.get_admins_list);
router.post('/', controller.adminAccountAction);

router.get('/search', controller.search);

router.get('/detail/:id', controller.get_admin_detail);
router.post('/detail/:id', controller.edit_admin);

router.get('/create', controller.get_admin_addPage);
router.post('/create', controller.add_admin);

/*Change password */
router.get('/change-password', controller.get_changepassword);


module.exports = router;
