const { body } = require('express-validator');

module.exports = [
    body('email')
        .isEmail().withMessage("Ingrese un email valido")
        .notEmpty().withMessage("Este campo no puede estar vacio"),
    body('password').notEmpty().withMessage("Este campo no puede estar vacio")
];