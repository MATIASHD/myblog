const db = require('../../../database/models');
const articles = {
  postCreate : (req, res) => {
    db.article.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.post,
      estract: req.body.estract,
      author_id: req.body.author,
      draft: req.body.draft,
      img: req.file.filename,
      created_at: new Date()
    })
    res.redirect('/dashboard/posts');
  },
  getCreate: async (req, res) => {
    try {
      const user = await db.users.findAll();
      res.locals.cabecera = {
        title: "Nuevo post",
        description: "Crea increibles entradas"
      }
        res.render('newPost', { user});
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
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
  getEditPost : async (req, res) =>{
    try {
      let article = await db.article.findByPk(req.params.id)
      let author = await db.users.findAll()
      let draftitem = [{ "nombre": "Publicar"},{ "nombre" : "Borrador"}]
      res.locals.cabecera = {
        title: "Nuevo post",
        description: "Crea increibles entradas"
      }
      res.render('editpost', { author, article, draftitem });
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
      const {title, post, subtitle, estract, author, post_status} = req.body;
      await db.article.update({
        title: title,
        subtitle: subtitle,
        content: post,
        estract: estract,
        author_id: author,
        draft: post_status,
        img: req.file ? req.file.filename : article.img,
        created_at: new Date(),
      },{
        where: {
          id: req.params.id
        }
      })
      res.redirect('/dashboard/posts');
    } catch(e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e })
    }
  },
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
