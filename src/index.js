const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const bodyParse = require('body-parser')
const session = require('express-session');

//Router
const mainRouter = require('./router/mainRouter');
const articleRouter = require('./router/articleRouter');
const dashboardRouter = require('./router/dashboardRouter');
const accessRouter = require('./router/access');

//Urlencoded - Manejo de datos desde los formularios
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//session
app.use(session({
    secret: 'Casa Partida',
    resave: false,
    saveUninitialized: false,
}));

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
app.use(mainRouter);
app.use(dashboardRouter);
app.use(accessRouter);
app.use(articleRouter);

app.use((req, res, next) => {
    res.status(404).render('errornotfound');
})

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