const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

const postRegisterController = (req,res) => {
        let pass = bcryptjs.hashSync(req.body.password, 10);
        console.log(pass)
        db.users.create({
            name:req.body.name,
            nick:req.body.nick,
            bio:req.body.bio,
            email:req.body.email,
            contrasenia: pass,
            image:req.body.image,
            surname:req.body.surname,
        });
        res.redirect('/');
    
}

module.exports = postRegisterController;