const db = require('../../../database/models');

const galeryController = {
  allmedia: async (req, res) => {
    try {
      const galeria = await db.galery.findAll()
      const locals = {
        title: "Galeria",
        description: "Caja de recuerdo"
      }
      res.render('galeria', { locals, galeria });
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  createMedia : async (req, res) => {
    try {
      const locals = {
        title: "Subir soporte",
        description: "Sube tus mejores creaciones aquí"
      }
      res.render('mediaupload', {locals});
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  postCreateMedia : async (req, res) => {
    try {
      db.galery.create({
        media: req.file.filename,
        alt: req.body.alt,
        figcaption: req.body.figcaption,
        mediatype: req.body.mediatype
      })
      res.redirect('/dashboard/galery');
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  readMedia : async (req, res) => {
    try {
      let media = await db.galery.findByPk(req.params.id)
      const locals = {
        title: "Vista de archivo multimedia",
        description: "Crea vea todo su contenido"
      }
      res.render('mediaView', { media, locals});
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  updateMedia : async (req, res) => {
    try {
      const locals = {
        title: "Subir archivos",
        description: "subir contenido al mundo"
      }
      res.render('subircontenido', { locals });
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  putupdateMedia : async (req, res) => {
    try {
      db.galery.update({
        media: req.file ? req.file.filename : galery.media,
        alt: req.body.alt,
        figcaption: req.body.figcaption,
        mediatype: req.body.mediatype
      }, {
        where: {
          id: req.params.id
        }
      })
      res.redirect('/dashboard/view/' + req.params.id);
    } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
    }
  },
  deleteMedia : async (req, res) => {
    try {
      db.galery.destroy({
        where:{
          id: req.params.id
        }
      })
      res.redirect('/dashboard/galery')
  } catch (e) {
      const locals = {
        title: "Mensaje de error",
        description: "Lo sentimos ha surgido un error"
      }
      res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e, locals })
    }
  },
}
module.exports = galeryController;
