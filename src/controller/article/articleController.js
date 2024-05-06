const db = require('../../../database/models');
const dashboardView = '../views/layouts/dashboard'
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
                subtitle: req.body.subtitle,
                image_url: req.file.filename,
                contenido: req.body.post,
                fecha_publicacion: new Date(),
                author: req.body.author,
                categoty: 1,
                tags: 1,
                like: 1
            })
            res.redirect('/dashboard/posts');
    },
    // 1. Fomulario de crear articulo
    getCreate: async (req, res) => {
        try {
            const locals = {
                title: "Nuevo post",
                description: "Crea increibles entradas"
            }
            res.render('newPost', { locals, layout: dashboardView });
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
            let article = await db.article.findByPk(req.params.id,{include: ["author"]})
            const locals = {
                title: article.title,
                description: "Crea increibles entradas"
            }
            res.render('news', { article, locals, layout: dashboardView });
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
            let articles = await db.article.findAll({include: ["author"]})
            const locals = {
                title: "Lista de articulos",
                description: "Las increibles entradas estan aquí"
            }
            res.render('articles', { articles, locals, layout: dashboardView });
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
            let article = await db.article.findByPk(req.params.id)
            let author = await db.users.findAll()
            const locals = {
                title: "Nuevo post",
                description: "Crea increibles entradas"
            }
            res.render('editPost', { locals, author, article, layout:  dashboardView});
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
            const article = await db.article.findByPk(req.params.id, {include: ["author"]});
            const {title, estracto, post, author, post_status} = req.body;
            await db.article.update({
                title: title,
                content: post,
                estract: estracto,
                author_id: author,
                draft: post_status,
                created_at: new Date(),
                img: req.file ? req.file.filename : article.image,
            },{
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/dashboard/post/'+ req.params.id);
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
                    idarticle: req.params.id
                }
            })
            res.redirect('/dashboard/users')
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
