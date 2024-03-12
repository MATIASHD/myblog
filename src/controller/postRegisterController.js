const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

const postRegisterController = (req,res) => {
        console.log(req.body.password);
        let pass = bcryptjs.hashSync(req.body.pass, 10);
        
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