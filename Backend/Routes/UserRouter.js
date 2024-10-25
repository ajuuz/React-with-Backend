const express = require('express');
const UserController = require('../Controllers/UserController');
const authMiddleware = require('../Middlewares/authMiddleware')
const { upload } = require('../multer/multer');
const router = express.Router();

router.post('/signup',UserController.signup)
router.post('/signin',UserController.singin)
router.post('/upload',authMiddleware.verifyUser,upload.single('image'),UserController.ImageUploads)
router.get('/getuser/:id',authMiddleware.verifyUser,UserController.getuser)
router.post('/edituser/:id/:key',authMiddleware.verifyUser,UserController.edituser)
router.post('/passwordchange/:id',authMiddleware.verifyUser,UserController.passwordcheck);
router.post('/editimage/:id',authMiddleware.verifyUser,UserController.editimage);
router.get('/logout',authMiddleware.verifyUser,UserController.logout)
module.exports = router;