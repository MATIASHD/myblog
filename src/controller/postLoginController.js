const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

const postLoginController = async(req, res) => {
    const { email, password } = req.body;
    let userToLogin = await db.users.findOne({
        where: {
            email: email
        }
    })
    
    if (userToLogin) {
        //let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.dataValues.password);
        console.log(userToLogin.dataValues.contrasenia)
        if (password == userToLogin.dataValues.contrasenia) {
            console.log('Pase por aqui')
            delete userToLogin.dataValues.password;
            //req.session.user = userToLogin;
           /* if(req.body.remember){
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
            }*/
            return res.redirect('/dashboard');
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