const db = require('../../../database/models');
const bcryptjs = require('bcryptjs');
// 1. Fomulario de crear articulo
// 2. Guardar los datos del usario en la BD
// 3. Leer un articulo
// 4. Leer todos los articulos
// 5. Formulario para actualizar articulo
// 6. Actualizar los datos del articulo
// 7. borrar el articulo
const users = {
    // 1. Fomulario de crear usuario
    getCreateUser : async (req, res) => {
        try {
            const locals = {
                title: "Nuevo usuario",
                description: "Crear un usuario increible"
            }
            res.render('register', {locals});
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 2. crear un usuario BD
    postCreateUser : async (req, res) => {
        try {
            let userInDB = await db.user.findByField('email', req.body.email)
            if(!userInDB){
                let passwordHash = bcryptjs.hashSync(req.body.password, 10);
                await db.users.create({
                    name: req.body.name,
                    surname: req.body.surname,
                    nick: req.body.nick,
                    bio: req.body.bio,
                    email:req.body.email,
                    contrasenia: passwordHash,
                    image: req.body.image
                })
                res.redirect('/users');
            } else {
                return res.render('register', {
                    errors:{
                        email:{
                            msg: "Este email ya esta registrado"
                        }
                    },
                    oldData : req.body
                })
            }
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 3. Leer profile
    getProfile : async (req, res) => {
        try {
            const profile = await db.users.findByPk({
                where: {
                    id: req.params.id
                }
            })
            const locals = {
                title: profile.name,
                description: "Perfil del usuario"
            }
            res.render('profile', { profile, locals });
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 4. Leer todos los usuarios
    getAllUsers : async (req, res) => {
        try {
            const user = await db.users.findAll();
            const locals = {
                title: "Todos los usuarios",
                description: "Aquí está todo tu staff"
            }
            res.render('dashboardUsers', { user, locals });
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 5. Actualizar los datos del articulo
    putUpdateUser  : async (req, res) => {
        try {
            await db.users.update({
                name: req.body.name,
                surname: req.body.surname,
                nick: req.body.nick,
                bio: req.body.bio,
                email:req.body.email,
                contrasenia:req.body.password,
                image: req.body.image
            },{
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/user/'+ req.params.id);
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 6. borrar el articulo
    deleteUser : async (req, res) => {
        try {
            await db.users.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.redirect('/users');
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    //7. Login
    getLogin : async (req, res) => {
        try {
            const locals = {
                title: "Iniciar sesión",
                description: "Ingresaras a una zona increible"
            }
            res.render('login', {locals});
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    //8. acceso login
    postLogin : async (req, res) => {
        try {
            const profile = await db.users.findByField('email', req.body.email)
            if(profile){
                if(bcryptjs.compareSync(req.body.password, profile.contrasenia)){
                    delete profile.contrasenia;
                    req.session.userLogged = profile;
                    res.redirect('/dashboard', {
                        user: req.session.userLogged
                    });
                } else {
                    return req.render('login', {
                        errors: {
                            email:{
                                msg: "Las credenciales son invalidas"
                            }
                        }
                    })
                }
                
            } else {
                return req.render('login', {
                    errors: {
                        email:{
                            msg: "Este usuario no se encuetra registrado"
                        }
                    }
                })
            }
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    } 

}
module.exports = users;