const db = require('../../../database/models');
const fs = require('fs');
const path = require('path');
const galeryController = {
  allmedia: async (req, res) => {
    try {
      const galeria = await db.galery.findAll()
      res.locals.cabecera = {
        title: "Galeria",
        description: "Caja de recuerdos"
      }
      res.render('galeria', { galeria });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  createMedia : async (req, res) => {
    try {
      res.locals.cabecera = {
        title: "Subir soporte",
        description: "Sube tus mejores creaciones aquí"
      }
      res.render('mediaupload', {locals});
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
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
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  readMedia : async (req, res) => {
    try {
      let media = await db.galery.findByPk(req.params.id)
      res.locals.cabecera = {
        title: "Vista de archivo multimedia",
        description: "Crea vea todo su contenido"
      }
      res.render('mediaView', { media });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  updateMedia : async (req, res) => {
    try {
      let media = await db.galery.findByPk(req.params.id)
      res.locals.cabecera = {
        title: "Subir archivos",
        description: "subir contenido al mundo"
      }
      res.render('editMedios', { media });
    } catch (e) {
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  putupdateMedia : async (req, res) => {
    try {
      db.galery.update({
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
      res.locals.cabecera = {
        title: "Hubo un error",
        description: "Tuvimos un problema con su petición"
      }
      res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e})
    }
  },
  deleteMedia : async (req, res) => {
    try {
      const mediafile = await db.galery.findByPk(req.params.id);
      await db.galery.destroy({
        where:{
          id: req.params.id
        }
      })
      const filePath = path.join(__dirname,'../../../public/assets/upload', path.basename(mediafile.media));
      console.log(filePath);
      fs.unlink(filePath, (e) => {
        if(e){
          res.locals.cabecera = {
            title: "Hubo un error",
            description: "Tuvimos un problema con su petición"
          }
            res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
        }
      })
      res.redirect('/dashboard/galery/')
  } catch (e) {
    res.locals.cabecera = {
      title: "Hubo un error",
      description: "Tuvimos un problema con su petición"
    }
      res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
    }
  },
}
module.exports = galeryController;
