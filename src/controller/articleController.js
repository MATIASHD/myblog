const db = require('../../database/models');

const articleController = async (req, res) => {
    try{
        let article = await db.article.findByPk(req.params.id);
        res.render('article', { article });
    } catch(e){
        res.send('Algo pasó');
    }
    
}

module.exports = articleController;