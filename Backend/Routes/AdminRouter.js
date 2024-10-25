const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController');

router.post('/signin',AdminController.signin)


module.exports = router;
