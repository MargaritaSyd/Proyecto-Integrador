const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController')

router.get('/create' , productController.create);

router.get('/detail' , productController.detail);

router.get('/edit' , productController.edit);

router.get('/list' , productController.list);


module.exports = router;