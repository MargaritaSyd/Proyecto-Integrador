const {body} = require ('express-validator');
const validations = [
    body('user').notEmpty().withMessage('Ingresá un nombre'),
    body('email').isEmail().withMessage('Ingresá tu mail'),
    body('password').isLength({min:8}),
    body('userImage').custom((value , {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg'];
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)){
            throw new Error ('La imagen debe ser .jpg'); 
        }
        return true
    })
]