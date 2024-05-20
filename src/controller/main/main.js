const db = require('../../../database/models')
const main = {
  getMain : async (req, res) => {
    try {
      const article = await db.article.findAll()
      const locals = {
        title: "main",
        description: "Todo lo que necesitas, está aquí"
      }
      res.render('index', { locals, article });
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  getArticle : async (req, res) => {
    try {
      let article = await db.article.findByPk(req.params.id,{include: ["author"]})
      const locals = {
        title: article.title,
        description: "Crea increibles entradas"
      }
      res.render('news', { article, locals});
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },
  getArticles : async (req, res) => {
    try {
      let articles = await db.article.findAll()

      const locals = {
        title: "Lista de articulos",
        description: "Las increibles entradas estan aquí"
      }
      res.render('allArticle', { articles, locals});
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },
  getResetPassword : async (req, res) => {
    try {
      const locals = {
        title: "Resetear usuario",
        description: "Vamos a verificar que todo este en orden"
      }
      res.render('passwordOnestep',{ locals })
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "No se encontró este articulo", code: e, locals })
    }
  },
  getError : async (req, res) => {
    res.send("Lo sentimos")
  },
}
module.exports = main;
