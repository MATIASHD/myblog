
const dashboardView = '../views/layouts/dashboard'
const dashboardController = async (req, res) => {
    try{
        const locals = {
            title: "Dashboard",
            description: "You can create everything"
        }
        res.render('dashboard', {locals, layout: dashboardView});
    } catch{

    }
    
}

module.exports = dashboardController;