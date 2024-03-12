const dashboardView = '../views/layouts/dashboard'
const dashboardController = (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "You can create everything"
    }
    res.render('dashboard', {locals, layout: dashboardView});
}

module.exports = dashboardController;