const path = require ('path');
const {body} = require ('express-validator');
const validations = [
    body('user').notEmpty().withMessage('Ingresá tu nombre'),
    body('lastNameUser').notEmpty().withMessage('Ingresá tu apellido'),
    body('email').isEmail().withMessage('Ingresá tu mail'),
    body('password').isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body('userImage').custom((value , {req}) => {
        if(req.file){
        let file = req.file;
        let acceptedExtensions = '.jpg';
        let fileExtension = path.extname(file.originalname);
        if (acceptedExtensions != fileExtension){
            throw new Error ('La imagen debe ser .jpg'); 
        }
        return true
    }
    })
]

module.exports = validations