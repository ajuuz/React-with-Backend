const express = require('express');
const AuthController = require('../Controllers/AuthController')
const router = express.Router();

router.post('/signup',AuthController.signup)
router.post('/signin',AuthController.singin)



module.exports = router;