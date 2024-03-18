const { db } = require('../../../database/models');
const { bcryptjs } = require('bcryptjs');

module.exports = {
    postCreate : async (req, res) => {
        try {
           /* const {name, surname, nick, email, password, bio, image } = res.body;
            let passHash = bcryptjs.hashSync(password, 10);
            db.users.create({
                name: name,
                surname: surname,
                nick: nick,
                bio: bio,
                email: email,
                contrasenia: passHash,
                image: image
            }) */
            res.redirect('/users');
        } catch(e) {
            res.render('error', { error: "Hubo un error al crear el post, vuelva a intentarlo mas tarde", code: e })
        }
        db.users.create()
    },
    getRead : async (req, res) => {
    
    },
    postUpdate : async (req, res) => {
    
    },
    postDel : async (req, res) => {
        try {
            db.article.destroy({
                where:{
                    idarticle: res.params.id
                }
            })
            res.redirect('/articles')
        } catch (e) {
            res.render('error', { error: "Hubo un error al eliminar al usuario, vuelva a intentarlo mas tarde", code: e })
            
        }
    }
}

/**
 * router.get('', async(req,res) => {
 *      try{
 *      const locals = {
 *          title: "Node js blog"
 *          description: "Simple Blog created"
 *      }
 *          await
 *      } catch(err){
 *          console.log(e)
 *      }
 * })
 */