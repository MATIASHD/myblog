const { body } = require('express-validator');
const { path } = require('path');

module.exports = [
    body('name')
        .escape()
        .notEmpty().withMessage('Este campo no puede estar vacio'),
    body('surname')
        .escape()
        .notEmpty().withMessage('Este campo no puede estar vacio'),
    body('email')
        .escape()
        .notEmpty().withMessage('Este campo no puede estar vacio')
        .isEmail().withMessage('Debe ingresar un email valido'),
    body('password')
        .escape()
        .notEmpty().withMessage('Este campo no puede estar vacio')
        .isLength({ min: 8 }).withMessage('Debe tener como minimo 8 caracteres')
        .matches(/^(?=.*[A-Z])(?!.*([0-9])\1{2})(?=.*\d).*$/).withMessage('La contraseña debe contener al menos una mayúscula y no tener números consecutivos'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg','.png','.gif'];
        if (file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones permitidas son las siguentes: ' + acceptedExtensions.join(', '));
            }
        }
        return true;
    })
]