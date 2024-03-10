const db = require('../../database/models');

const loginController = (req, res) => {     
    res.render('login');
}

module.exports = loginController;