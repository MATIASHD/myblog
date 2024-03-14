const dashboardView = '../views/layouts/dashboard'
const usersDashboardController = (req, res) => {
    const locals = {
        title: "Usuarios",
        description: "panel de usuarios"
    }
    res.render('dashboardUsers', {locals, layout: dashboardView});
}

module.exports = usersDashboardController;