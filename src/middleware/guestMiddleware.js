function guestMiddleware(req, res, next) {
  if(req.session.user) {
    res.redirect('/dashboard');
  }
  next();
}
module.exports = guestMiddleware;
