const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const multer = require ('multer');
let multerDiskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {let folder = path.join(__dirname, '../../public/imagenes/productImages');
        callback (null, folder)
        },
        filename: (req, file, callback) => {
            let imageName= Date.now() + path.extname(
                file.originalname
            );
            callback(null, imageName)
        }

    }
)
let fileUpload = multer ({
    storage: multerDiskStorage
})

router.get('/' , productController.list);

router.post('/create', fileUpload.single(
    "productImage"), productController.processForm);
    
router.get('/create' , productController.create);

router.get('/detail/:id' , productController.detail);

router.get('/edit/:id' , productController.edit);

// accion de editar un producto
router.put('/:id' , fileUpload.single(
    "productImage"),productController.update);






module.exports = router;