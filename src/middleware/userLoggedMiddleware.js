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
    res.locals.cabecera = {
      title: "Error en el acceso",
      description: "Parece que tuvimos un problemas, lo sentimos"
    }
    res.render('error', {error: "Hubo un problema con la autenticación", code: e})
  }
}
module.exports = userLoggedMiddleware;
