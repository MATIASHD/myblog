const { body } = require('express-validator');
const { path } = require('path');

//Validations
module.exports  = [
    body('name').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('surname').notEmpty().withMessage('Este campo no puede estar vacio'),
    body('email')
        .isEmail().withMessage('Debe ingresar un email valido')
        .notEmpty().withMessage('Este campo no puede estar vacio'),
    body('password')
        .notEmpty().withMessage('Este campo no puede estar vacio')
        .fields({minCount: 8}).withMessage('Debe tener como minimo 8 caracteres'),
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
    
];

