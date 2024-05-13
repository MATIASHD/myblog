const db = require('../../../database/models')

//, createMedia, postCreateMedia, readMedia, updateMedia, putupdateMedia, deleteMedia
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
    
    getArticle : async (req, res) => {
        try {
            let article = await db.article.findByPk(req.params.id,{
              include: ["author"]
            })
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
        res.send("reseteo esta aqui")
    },
    getError : async (req, res) => {
        res.send("Lo sentimos")

    },
}
module.exports = galeryController;