const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const multer = require ('multer');
let multerDiskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {let folder = path.join(__dirname, '../public/imagenes');
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

router.post('/create', fileUpload.array (
    "productImage"), productController.processForm);
    
router.get('/create' , productController.create);

router.get('/detail' , productController.detail);

router.get('/edit' , productController.edit);

router.get('/list' , productController.list);


module.exports = router;