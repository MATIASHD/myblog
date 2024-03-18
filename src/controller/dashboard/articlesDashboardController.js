const db = require('../../../database/models');
const dashboardView = '../views/layouts/dashboard'
const articleDashboardController = async (req, res) => {
    try {
        const allArticle = await db.article.findAll()
        const locals = {
            title: "Articulo",
            description: "panel de entradas"
        }
        res.render('dashboardArticle', {locals, layout: dashboardView, article: allArticle});
    } catch (err){
        res.send(err)
    }
    
}

module.exports = articleDashboardController;