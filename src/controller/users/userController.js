const db = require('../../../database/models');
const bcryptjs = require('bcryptjs');
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
      res.locals.cabecera = {
        title: "Nuevo usuario",
        description: "Ingrese los datos del usuario"
      }
      res.render('register');
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se pudo crear el usuario", code: e })
    }
  },

  // 2. crear un usuario BD
  postCreateUser : async (req, res) => {
    try {
      let userInDB = await db.users.findOne({where: {email: req.body.email}})
      if(!userInDB){
        let passwordHash = bcryptjs.hashSync(req.body.password, 10);
        await db.users.create({
          username: req.body.name,
          lastname: req.body.surname,
          email:req.body.email,
          userpassword: passwordHash,
          userimg: req.file.filename
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
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se pudo crear este usuario", code: e })
    }
  },

  // 3. Leer profile
  getProfile : async (req, res) => {
    try {
      const profile = await db.users.findByPk(req.params.id);
      res.locals.cabecera = {
        title: profile.username + " "+ profile.lastname,
        description: "Bienvenido " + profile.username + " "+ profile.lastname
      }
      res.render('profile', { user: profile });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró el usuario", code: e })
    }
  },

  // 4. Leer todos los usuarios
  getAllUsers : async (req, res) => {
    try {
      const user = await db.users.findAll();
      res.locals.cabecera = {
        title: "Lista de usuarios",
        description: "Todos los creativos en un solo lugar"
      }
      res.render('dashboardUsers', { user });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró la lista de usuario", code: e })
    }
  },

  getEditUser : async (req, res) => {
    try {
      const profile = await db.users.findByPk(req.params.id);
      res.locals.cabecera = {
        title: profile.name + " "+ profile.lastname,
        description: "Bienvenido " + profile.name + " "+ profile.lastname
      }
      res.render('edituser', { profile });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró el usuario", code: e })
    }
  },

  // 5. Actualizar los datos del articulo
  putUpdateUser  : async (req, res) => {
    try {
      await db.users.update({
        username: req.body.name,
        lastname: req.body.surname,
        email:req.body.email,
        image: req.file.filename
      },{
        where: {
          id: req.params.id
        }
      })
      res.redirect('/dashboard/user/profile/'+ req.params.id);
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e})
    }
  },

  // 6. borrar el articulo
  deleteUser : async (req, res) => {
    try {
      await db.users.destroy({ where: { id: req.params.id } })
      res.redirect('/dashboard/users');
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },

  //7. Login
  getLogin : async (req, res) => {
    try {
      res.locals.cabecera = {
        title: "Iniciar sesión",
        description: "Ingrese sus credenciales para inciar sesión"
      }
      res.render('login');
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },

  //8. acceso login
  postLogin : async (req, res) => {
    try {
      if(req.body.password == '') {
        res.locals.cabecera = {
          title: "Iniciar sesión",
          description: "Ingrese sus credenciales para inciar sesión"
        }
        return res.render('login', {errors: { password:{ msg: "El campo de la contraseña no puede estar vacio" }}})
      }
      const user = await db.users.findOne({ where: { email: req.body.email }})
      if(user){
          let passAccepted = bcryptjs.compareSync(req.body.password, user.userpassword)
          if(passAccepted){
            delete user.dataValues.userpassword
            req.session.user = user;
            if (req.body.saveme) {
              res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})
            }
            return res.redirect('/dashboard');
          } else {
            return res.render('login', { errors: { email: { msg: "Las credenciales son invalidas" }}})
          }

      }
    } catch(e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "hubo un problema al iniciar sesión contacte al soporte técnico", code: e})
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
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No pudimos avanzar con tu petición", code: e })
    }
  }
}
module.exports = usersController;
