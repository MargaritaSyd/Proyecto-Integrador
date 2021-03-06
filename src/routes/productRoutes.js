const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const fileUpload = require('../middlewares/productMulter');
const adminUser = require('../middlewares/admin');

const validationProduct = require('../middlewares/validationProduct');

router.get('/' , productController.list);

router.post('/create', fileUpload.single("productImage"), validationProduct, productController.processForm);
    
router.get('/create' , adminUser , productController.create);

router.get('/detail/:id' , productController.detail);

router.get('/panel', adminUser, productController.controlPanel);

router.get('/edit/:id' , adminUser , productController.edit);

// accion de editar un producto
router.put('/:id' , fileUpload.single ("productImage"), validationProduct, productController.update);

// accion de eliminar un producto
router.delete('/:id', productController.destroy); 


router.get('/api/all_products', productController.allProducts);

router.get('/api/total_categories' , productController.totalCategories);

router.get('/api/one_product/:id' , productController.oneProduct);





module.exports = router;