const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('./../controllers/userController');
const fileUpload = require('../middlewares/userMulter');
const validationUser = require('../middlewares/validationUsers');
const guestUser = require('../middlewares/guestUser');
const loggedUser = require('../middlewares/loggedUser');


router.get('/register' , loggedUser , userController.register);

router.post('/register' , fileUpload.single('userImage') , validationUser , userController.storeRegister);

router.get('/profile' , guestUser , userController.profile);

router.get('/login' , loggedUser , userController.login);

//router.post('/login' , userController.loginProcess);

router.get('/logout' , guestUser , userController.logout)

module.exports = router;