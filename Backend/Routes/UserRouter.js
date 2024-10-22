const express = require('express');
const UserController = require('../Controllers/UserController');
const User = require('../Models/Schema');
const router = express.Router();

router.get('/mes',UserController.mes)

module.exports = router;