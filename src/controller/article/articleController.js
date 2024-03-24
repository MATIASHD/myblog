const db = require('../../../database/models');
// 1. Fomulario de crear articulo
// 2. Guardar los datos del usario en la BD
// 3. Leer un articulo
// 4. Leer todos los articulos
// 5. Formulario para actualizar articulo
// 6. Actualizar los datos del articulo
// 7. borrar el articulo
const articles = {
    // 2. Guardar los datos del usario en la BD
    postCreate : (req, res) => {
            db.article.create({
                title: req.body.title,
                image_url: req.body.image,
                contenido: req.body.post,
                fecha_publicacion: new Date(),
                author: req.body.author,
                categoty: 1,
                tags: 1,
                like: 1
            }) 
            res.redirect('/articles');
    },
    // 1. Fomulario de crear articulo
    getCreate: async (req, res) => {
        try {
            const locals = {
                title: "Nuevo post",
                description: "Crea increibles entradas"
            }
            res.render('newPost', { locals });  
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
        }
    },
    // 3. Leer un articulo
    getRead : async (req, res) => {
        try {
            let article = await db.article.findByPk(req.params.id)
            const locals = {
                title: article.title,
                description: "Crea increibles entradas"
            }
            res.render('article', { article, locals });
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    
    },
    // 4. Leer todos los articulos
    getAllRead : async (req, res) => {
        try {
            let articles = await db.article.findAll()
            const locals = {
                title: "Lista de articulos",
                description: "Las increibles entradas estan aquí"
            }

            res.render('allArticle', { articles, locals });
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    getAllReadPanel : async (req, res) => {
        try {
            let articles = await db.article.findAll()
            const locals = {
                title: "Lista de articulos",
                description: "Las increibles entradas estan aquí"
            }
            res.render('dashboardArticle', { articles, locals });
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
    },
    // 5. Formulario para actualizar articulo
    getEditPost : async (req, res) =>{
        try {
            const locals = {
                title: "Nuevo post",
                description: "Crea increibles entradas"
            }
            res.render('editPost', { locals });  
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
        }
    },
    putUpdate : async (req, res) => {
        try {
            const {title, image, post, author} = res.body;
            await db.article.update({
                title: title,
                image_url: image,
                contenido: post,
                fecha_publicacion: new Date(),
                author: author,
                categoty: 1,
                tags: 1,
                like: 1
            }) 
            res.redirect('/articles');
        } catch(e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e, locals })
        }
    },
    // 7. borrar el articulo
    postDel : async (req, res) => {
        try {
            db.article.destroy({
                where:{
                    idarticle: res.params.id
                }
            })
            res.redirect('/articles')
        } catch (e) {
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e, locals })
            
        }
    }
}
module.exports = articles;
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