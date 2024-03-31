
const dashboardView = '../views/layouts/dashboard'
const dashboard = {
    dashboard : async (req, res) => {
        try{
            const locals = {
                title: "Dashboard",
                description: "You can create everything"
            }
            res.render('dashboard', {locals, layout: dashboardView});
        } catch{
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
       
    },
    getError : async (req, res) => {
        try{
            const locals = {
                title: "Dashboard",
                description: "You can create everything"
            }
            res.res("Aquí va un error")
        } catch{
            const locals = {
                title: "Mensaje de error",
                description: "Lo sentimos ha surgido un error"
            }
            res.render('error', { error: "No se encontró este articulo", code: e, locals })
        }
       
    }
    
}

module.exports = dashboard;