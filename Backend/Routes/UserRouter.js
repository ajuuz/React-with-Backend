const express = require('express');
const UserController = require('../Controllers/UserController');
const { upload } = require('../multer/multer');
const router = express.Router();

router.post('/signup',UserController.signup)
router.post('/signin',UserController.singin)
router.post('/upload',upload.single('image'),UserController.ImageUploads)
router.get('/getuser/:id',UserController.getuser)

module.exports = router;