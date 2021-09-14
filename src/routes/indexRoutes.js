const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/' , indexController.index);

router.get('/cart/:id' , indexController.cart);

router.get('/faqs' , indexController.faqs);

router.get('/nosotros' , indexController.nosotros);

router.get('/error', indexController.error);

router.get('/transaction', function(req,res){ return res.render("transaction")});


module.exports = router;