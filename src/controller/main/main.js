const db = require('../../../database/models')
const main = {
  getMain : async (req, res) => {
    try {
      const article = await db.article.findAll({include: ["tags", "media"]})
      const user = await db.users.findAll()
      res.locals.cabecera = {
        title: "Bienvenidos",
        description: "Todo el contenido de tecnologia está en esta web"
      }
      res.render('index', { article, user });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e })
    }
  },
  getArticle : async (req, res) => {
    try {
      let article = await db.article.findByPk(req.params.id,{include: ["author", "tags", "media"]})
      res.locals.cabecera = {
        title: article.title,
        description: article.estract
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
  getArticles : async (req, res) => {
    try {
      let articles = await db.article.findAll()
      res.locals.cabecera = {
        title: "Lista de articulos",
        description: "Las increibles entradas estan aquí"
      }
      res.render('allArticle', { articles });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e })
    }
  },
  getResetPassword : async (req, res) => {
    try {
      res.locals.cabecera = {
        title: "Resetear usuario",
        description: "Vamos a verificar que todo este en orden"
      }
      res.render('passwordOnestep')
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "Hubo un error", code: e })
    }
  },
  getError : async (req, res) => {
    res.send("Lo sentimos")
  },
}
module.exports = main;
