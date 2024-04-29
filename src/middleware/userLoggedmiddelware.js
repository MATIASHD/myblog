const db = require('../../database/models');

const userLoggedMiddleware = async (req, res, next) => {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = await db.users.findOne({ where: { email: emailInCookie || null}});

  if(userFromCookie){
    req.session.user = userFromCookie;
  }

  if (req.session && req.session.user) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.user;
  }

  next();
}
module.exports = userLoggedMiddleware;
