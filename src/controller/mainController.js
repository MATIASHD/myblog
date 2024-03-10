const db = require('../../database/models');

const mainController = (req, res) => {
    let article = db.article.findAll()
        .then(function(article) {
            res.render('index', {article});
        })
}

module.exports = mainController;