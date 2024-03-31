const db = require('../../database/models');
function guestMiddleware(req, res, next) {
    if (req.session.userLogged) {
        res.redirect('/dashboard/user/profile/');
    }
    next();
}
module.exports = guestMiddleware;