const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/' , indexController.index);

router.get('/cart' , indexController.cart);

router.get('/faqs' , indexController.faqs);

router.get('/nosotros' , indexController.nosotros);

module.exports = router;