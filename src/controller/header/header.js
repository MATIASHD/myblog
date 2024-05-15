const navbar = (req, res) => {
    const user = req.locals.userLogged;
    if(user){
        res.render('partials/header', { user })
    } else {
        res.render('partials/header', { user: null })
    }
}

module.exports = navbar;