const db = require('../../database/models');
const userLoggedMiddleware = async(req, res, next) => {
  try {
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = await db.users.findOne({ where: {email: emailInCookie || null}});
    if (userFromCookie) {
      req.session.user = userFromCookie;
    }
    if (req.session && req.session.user){
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.user;
    }
    next();
  } catch (e) {
    const locals = {
      title: "Mensaje de error",
      description: "Lo sentimos ha surgido un error"
    }
    res.render('error', {error: "Hubo un problema al intentar acceder a este recurso", code: e, locals})
  }
  
}
module.exports = userLoggedMiddleware;
