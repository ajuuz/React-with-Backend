const express = require('express');
const UserController = require('../Controllers/UserController');
const router = express.Router();

router.post('/signup',UserController.signup)
router.post('/signin',UserController.singin)



module.exports = router;