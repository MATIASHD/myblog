const db = require('../../database/models')

const allArticleController = async (req, res) => {
    try{
        let article = await db.article.findAll();
        res.render('allArticle', {article});
    } catch (e){
        res.send('Algo pasó' + e);
    }
}

module.exports = allArticleController;