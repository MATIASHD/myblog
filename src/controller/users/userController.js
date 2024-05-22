const db = require('../../../database/models');
const bcryptjs = require('bcryptjs');
const usersController = {
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
        title: profile.username + " "+ profile.lastname,
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
  putUpdateUser  : async (req, res) => {
    try {
      const user = await db.users.findByPk(req.params.id)
      await db.users.update({
        username: req.body.name,
        lastname: req.body.surname,
        email:req.body.email,
        userimg: req.file ? req.file.filename : user.userimg
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
