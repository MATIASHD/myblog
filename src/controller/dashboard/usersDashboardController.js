const db = require('../../../database/models');
const dashboardView = '../views/layouts/dashboard'
const usersDashboardController = async (req, res) => {
    try {
        const allUsers = await db.users.findAll()
        const locals = {
            title: "Usuarios",
            description: "panel de usuarios"
        }
        res.render('dashboardUsers', {locals, layout: dashboardView, users: allUsers});
    } catch (err){
        res.send(err)
    }
    
}

module.exports = usersDashboardController;