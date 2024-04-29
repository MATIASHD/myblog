const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const bodyParse = require('body-parser')
const session = require('express-session');
const cookies = require('cookie-parser');
const helmet = require('helmet');
const fetch = require('node-fetch');

//Router
const userLoggedMiddleware = require('./middleware/userLoggedmiddelware');

//session
app.use(session({
  secret: "casa_partida",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: true}
}));

//Urlencoded - Manejo de datos desde los formularios
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//

//Cookie
app.use(cookies());

//Middle de aplicación
app.use(userLoggedMiddleware);

//Morgan
app.use(morgan('dev'));

//reconocer put y delete
app.use(methodOverride('_method'))

//EJS Config
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Public content
app.use(express.static('public'));
//Router
const mainRouter = require('./router/mainRouter');
const dashboardRouter = require('./router/dashboardRouter');
app.use(mainRouter);
app.use(dashboardRouter);

app.use((req, res, next) => {
    res.status(404).render('errornotfound');
})

//Helmet protege de inyeccion de scripts entres sitios XSS
app.use(helmet())
//Desactivar el header x-powered-by: express
app.disable('x-powered-by');
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
module.exports = app;
