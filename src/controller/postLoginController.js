const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

const postLoginController = async(req, res, next) => {
    let userToLogin = await db.users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (userToLogin) {
        let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.dataValues.password);
        if (correctPassword) {
            delete userToLogin.dataValues.password;
            req.session.user = userToLogin;
            if(req.body.remember){
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
            }
            return res.redirect('/dashboard/');
        }
        return res.render('login',{
            errors: {
                password: { msg: 'La combinacion de email y contraseña no es correcta.'}
            }
        })
    }
    return res.render('login',{
        errors:{
            email:{ msg: 'Este usuario no se encuentra registrado.'},
            password: { msg: 'El campo está vacio.'}
        }
    });
}

module.exports = postLoginController;