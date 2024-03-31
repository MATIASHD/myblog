const db = require('../../database/models')
const userLoggedMiddleware = async (req,res,next) => {
    res.locals.isLogged = false;

    //Cookie
   /* let emailInCookie = req.cookies.userEmail;
       let userFromCookie = await db.users.findOne({where: { email: emailInCookie }})
    if(userFromCookie){
        req.session.userLogged = userFromCookie
    }*/

    //Session
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged;
    }
    next();
}
module.exports = userLoggedMiddleware;

//middleware de aplicación