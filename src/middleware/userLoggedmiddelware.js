const db = require('../../database/models');

const userLoggedMiddleware = async (req, res, next) => {
  if (req.session.user){
    console.log("EStoy por acá 1");
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.user;
  } else {
    res.locals.isLogged = false;
    console.log("EStoy por acá 2");
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = await db.users.findOne({ where: {email: emailInCookie || null}});

    if(userFromCookie){
      console.log("EStoy por acá 3");
      req.session.userLogged = userFromCookie;
    }
    if(req.session.userLogged){
      console.log("EStoy por acá 4");
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
  }
  next();
}
module.exports = userLoggedMiddleware;
