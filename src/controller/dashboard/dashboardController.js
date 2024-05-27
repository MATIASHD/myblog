const db = require('../../../database/models');
const dashboard = {
  dashboard : async (req, res) => {
    try{
      const articleCount = await db.article.count();
      const allpost = await db.article.findAll({ limit: 10 });
      res.locals.cabecera = {
        title: "Nuevo post",
        description: "Crea increibles entradas"
      }
      res.render('dashboard', {articleCount, post: allpost });
    } catch{
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', { error: "No se encontró este articulo", code: e })
    }
  }
}
module.exports = dashboard;
