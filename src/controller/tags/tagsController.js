const db = require('../../../database/models');
const tags = {
alltags: async (req, res) => {
  try {
    const alltags = await db.category.findAll();
    res.render('alltags', { alltags })
  } catch (e) {
    res.locals.cabecera = {
      title: "Hubo un error",
      description: "Tuvimos un problema con su petición"
    }
    res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
  }
},

postCreateTags: async (req, res) => {
  try {
    await db.category.create({
      nombre: req.body.name
    })
    res.redirect('/dashboard/tags');
  } catch (e) {
    res.locals.cabecera = {
      title: "Hubo un error",
      description: "Tuvimos un problema con su petición"
    }
    res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
  }
},
deleteTags: async (req, res) => {
  try {
    await db.category.destroy({ where: { id: req.params.id }});
    res.redirect('/dashboard/tags');
  } catch (e) {
    res.locals.cabecera = {
      title: "Hubo un error",
      description: "Tuvimos un problema con su petición"
    }
      res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
  }
}
}
module.exports = tags;
