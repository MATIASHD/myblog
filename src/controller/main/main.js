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
    }
   
}
module.exports = main;