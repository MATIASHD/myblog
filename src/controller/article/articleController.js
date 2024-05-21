const db = require('../../../database/models');
const dashboardView = '../views/layouts/dashboard'
// 1. Fomulario de crear articulo
// 2. Guardar los datos del usario en la BD
// 3. Leer un articulo
// 4. Leer todos los articulos
// 5. Formulario para actualizar articulo
// 6. Actualizar los datos del articulo
// 7. borrar el articulo
const articles = {
  // 2. Guardar los datos del usario en la BD
  postCreate : (req, res) => {
    db.article.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image_url: req.file.filename,
      contenido: req.body.post,
      fecha_publicacion: new Date(),
      author: req.body.author,
      categoty: 1,
      tags: 1,
      like: 1
    })
    res.redirect('/dashboard/posts');
  },
  // 1. Fomulario de crear articulo
  getCreate: async (req, res) => {
    try {
      res.locals.cabecera = {
        title: "Nuevo post",
        description: "Crea increibles entradas"
      }
        res.render('newPost');
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  // 3. Leer un articulo
  getRead : async (req, res) => {
    try {
      let article = await db.article.findByPk(req.params.id,{include: ["author"]})
      res.locals.cabecera = {
        title: article.title,
        description: "Crea increibles entradas"
      }
      res.render('news', { article });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e })
    }
  },
  // 4. Leer todos los articulos
  getAllRead : async (req, res) => {
    try {
      let articles = await db.article.findAll({include: ["author"]})
      res.locals.cabecera = {
        title: "Lista de articulos",
        description: "Las increibles entradas estan aquí"
      }
      res.render('articles', { articles });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e })
    }
  },
  // 5. Formulario para actualizar articulo
  getEditPost : async (req, res) =>{
    try {
      let article = await db.article.findByPk(req.params.id)
      let author = await db.users.findAll()
      res.locals.cabecera = {
        title: "Nuevo post",
        description: "Crea increibles entradas"
      }
      res.render('editPost', { author, article});
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  putUpdate : async (req, res) => {
    try {
      const article = await db.article.findByPk(req.params.id, {include: ["author"]});
      const {title, estracto, post, author, post_status} = req.body;
      await db.article.update({
        title: title,
        content: post,
        estract: estracto,
        author_id: author,
        draft: post_status,
        created_at: new Date(),
        img: req.file ? req.file.filename : article.image,
      },{
        where: {
          id: req.params.id
        }
      })
      res.redirect('/dashboard/post/'+ req.params.id);
    } catch(e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e })
    }
  },
  // 7. borrar el articulo
  postDel : async (req, res) => {
    try {
      db.article.destroy({
        where:{
          id: req.params.id
        }
      })
      res.redirect('/dashboard/posts')
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
    }
  }
}
module.exports = articles;
