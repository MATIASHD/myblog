const db = require('../../../database/models');
const dashboardView = '../views/layouts/dashboard'
const bcryptjs = require('bcryptjs');
const userLogged = require('../../middleware/userLoggedmiddelware');
// 1. Fomulario de crear articulo
// 2. Guardar los datos del usario en la BD
// 3. Leer un articulo
// 4. Leer todos los articulos
// 5. Formulario para actualizar articulo
// 6. Actualizar los datos del articulo
// 7. borrar el articulo
const usersController = {

  // 1. Fomulario de crear usuario
  getCreateUser : async (req, res) => {
    try {
      const locals = {
        title: "Nuevo usuario",
        description: "Crear un usuario increible"
      }
      const userLogged = req.session.user || null;
      res.render('register', {locals, layout: dashboardView, userLogged });
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
      let userInDB = await db.users.findOne({where: {email: req.body.email}})
      if(!userInDB){
        let passwordHash = bcryptjs.hashSync(req.body.password, 10);
        await db.users.create({
          name: req.body.name,
          surname: req.body.surname,
          nick: req.body.nick,
          bio: req.body.bio,
          email:req.body.email,
          contrasenia: passwordHash,
          image: req.file.filename
        })
        res.redirect('/dashboard/users');
      } else {
        return res.render('register', {
          errors:{
            email:{
              msg: "Este email ya esta registrado"
            }
          },
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
      const profile = await db.users.findByPk(req.params.id);
      const locals = {
        title: profile.name,
        description: "Perfil del usuario"
      }
      const userLogged = req.session.user || null;
      res.render('profile', { user: profile, locals, layout: dashboardView, userLogged });
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
      const userLogged = req.session.user || null;
      res.render('dashboardUsers', { user, locals, layout: dashboardView, userLogged });
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },

  getEditUser : async (req, res) => {
    try {
      const profile = await db.users.findByPk(req.params.id);
      const locals = {
        title: profile.name,
        description: "Perfil del usuario"
      }
      const userLogged = req.session.user || null;
      res.render('edituser', { profile, locals, layout: dashboardView, userLogged });
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
        image: req.file.filename
      },{
        where: {
          id: req.params.id
        }
      })
      res.redirect('/dashboard/user/profile/'+ req.params.id);
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
      await db.users.destroy({ where: { id: req.params.id } })
      res.redirect('/dashboard/users');
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
      const profile = await db.users.findOne({ where: { email: req.body.email}});
      console.log(profile);
      if(profile){
        if (req.body.password == '') {
          return res.render('login', {errors: { password:{ msg: "El campo de la contraseña no puede estar vacio" }}})
        }
        if(bcryptjs.compareSync(req.body.password, profile.userpassword)){
          delete profile.userpassword;
          req.session.user = profile;

          if (req.body.saveme) {
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})
          }
          userLogged(req, res, () => {
            res.redirect('/dashboard');
          })

        } else {
          return res.render('login', { errors: { email: { msg: "Las credenciales son invalidas" }}})
        }
      } else {
        return res.render('login', { errors: { email: { msg: "Este email no se encuetra registrado" }}})
      }
    } catch (e) {
      const locals = {
        title: "Problema en el iniciar de sesión",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "hubo un problema al iniciar sesión contacte al soporte técnico", code: e, locals })
    }
  },

  getResetPassword: async (req, res) => {
    res.render('resetpassword');
  },

  putResetPassword: async (req, res) => {
    res.render('resetpassword');
  },

  getLogout : async (req, res) => {
    try {
      req.session.destroy()
      res.clearCookie('userEmail');
      return res.redirect('/');
    } catch (e) {
      const locals = {
        title: "Cerrar sesión",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "No pudimos avanzar con tu petición", code: e, locals })
    }
  }
}
module.exports = usersController;
