const path = require ('path');
const {body} = require ('express-validator');
const validations = [
    body('name').notEmpty().withMessage('El campo "nombre" no puede estar vacío'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoría'),
    body('price').notEmpty().withMessage('El campo "precio" no puede estar vacío'),
    body('stock').notEmpty().withMessage('El campo "stock" no puede estar vacío'),
    /*body('productImage').custom((value , {req}) => {
        if(req.file!=null){
            const objImages= req.files.productImage;
            if(objImages.mimetype!="image/gif"&&objImages.mimetype!="image/png"&&objImages.mimetype!="image/jpeg"&&objImages.mimetype!="image/bmp"&&objImages.mimetype!="image/webp"){
               throw new Error ('El archivo debe ser formato imagen'); 
            }
            else if (objImages.size>512000){
                throw new Error ('El tamaño del archivo supera el máximo permitido. Puedes intentar nuevamente. Recuerda que la imagen de perfil no es obligatoria.'); 
            }
            return true
            } else {
                return true
            }
        })*/
]

module.exports = validations