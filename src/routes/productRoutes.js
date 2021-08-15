const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const fileUpload = require('../middlewares/productMulter');
const adminUser = require('../middlewares/admin');

router.get('/' , productController.list);

router.post('/create', fileUpload.single(
    "productImage"), productController.processForm);
    
router.get('/create' , adminUser , productController.create);

router.get('/detail/:id' , productController.detail);

router.get('/edit/:id' , adminUser , productController.edit);

// accion de editar un producto
router.put('/:id' , fileUpload.single(
    "productImage"),productController.update);

// accion de eliminar un producto
router.delete('/:id', productController.destroy); 





module.exports = router;