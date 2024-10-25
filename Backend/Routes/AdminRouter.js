const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController');

router.post('/signin',AdminController.signin)
router.get('/logout',AdminController.logout);
router.get('/getallUsers',AdminController.getallUsers)
router.get('/viewuser/:id',AdminController.getuser)
module.exports = router;
