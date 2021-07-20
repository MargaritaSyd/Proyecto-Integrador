const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('./../controllers/userController');
const fileUpload = require('../middlewares/userMulter');
const validationUser = require('../middlewares/validationUsers');


router.get('/register' , userController.register);

router.post('/register' , fileUpload.single('userImage') , validationUser , userController.storeRegister);

router.get('/profile' , userController.profile);

router.get('/login' , userController.login);


module.exports = router;