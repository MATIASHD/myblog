const db = require('../../../database/models')
const perfil = {
  perfil : async (req, res) => {
    try {
      const autor = await db.users.findAll()
      res.locals.cabecera = {
        title: "Selecionar tu perfil",
        description: "Apoderate de todo"
      }
      res.render('masteruser', { autor });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e })
    }
  },
  perfilupdate : async (req, res) => {
    try {
      await db.users.sequelize.transaction(async (t) => {
        await db.users.update(
          { perfil_activo : 0}, { where: {}}
        );
        await db.users.update(
          { perfil_activo : 1 }, { where: { id: req.body.autor }}
        );
      })
      res.locals.cabecera = {
        title: "Selecionar tu perfil",
        description: "Apoderate de todo"
      }
      if (res.status === 200) {
        let msj = "Se guardó con éxito";
        res.redirect('/dashboard/perfil');
      } else {
        let msj = null;
        res.redirect('/dashboard/perfil');
      }
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e })
    }
  },
}
module.exports = perfil;
