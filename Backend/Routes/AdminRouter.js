const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController');

const authMiddleware = require('../Middlewares/authMiddleware')

router.post('/signin',AdminController.signin)
router.get('/logout',AdminController.logout);
router.get('/getallusers',authMiddleware.verifyAdmin,AdminController.getallUsers)
router.get('/viewuser/:id',authMiddleware.verifyAdmin,AdminController.getuser)
router.post('/useredit/:id',authMiddleware.verifyAdmin,AdminController.edituser)
router.post('/editimage/:id',authMiddleware.verifyAdmin,AdminController.editimage);
router.get('/delete/:id',authMiddleware.verifyAdmin,AdminController.deleteuser)
router.post('/adduser',authMiddleware.verifyAdmin,AdminController.adduser)

module.exports = router;
