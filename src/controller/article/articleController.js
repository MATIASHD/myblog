const { db } = require('../../../database/models');
const { bcryptjs } = require('bcryptjs');

module.exports = {
    postCreate : async (req, res) => {
        try {
            const {title, image, contenido, author, category, tags, like } = res.body;
            await db.article.create({
                title: title,
                image_url: image,
                contenido: contenido,
                fecha_publicacion: new Date(),
                author: author,
                categoty: category,
                tags: tags,
                like: like
            }) 
            res.redirect('/articles');
        } catch(e) {
            res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e })
        }
    },
    getRead : async (req, res) => {
        const { id } = res.body;
        try {
            let article = await db.article.findByPk({
                where:{
                    idarticle: id
                }
            })
            res.render('article', { article });
        } catch (e) {
            res.render('error', { error: "No se encontró este articulo", code: e })
        }
    
    },
    getAllRead : async (req, res) => {
        try {
            let article = await db.article.findAll()
            res.render('article', { article });
        } catch (e) {
            res.render('error', { error: "No se encontró este articulo", code: e })
        }
    },
    postUpdate : async (req, res) => {
        try {
            const {title, image, contenido, author, category, tags, like } = res.body;
            await db.article.update({
                title: title,
                image_url: image,
                contenido: contenido,
                fecha_publicacion: new Date(),
                author: author,
                categoty: category,
                tags: tags,
                like: like
            }) 
            res.redirect('/articles');
        } catch(e) {
            res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e })
        }
    },
    postDel : async (req, res) => {
        try {
            db.article.destroy({
                where:{
                    idarticle: res.params.id
                }
            })
            res.redirect('/articles')
        } catch (e) {
            res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
            
        }
    }
}

/**
 * router.get('', async(req,res) => {
 *      try{
 *      const locals = {
 *          title: "Node js blog"
 *          description: "Simple Blog created"
 *      }
 *          await
 *      } catch(err){
 *          console.log(e)
 *      }
 * })
 */