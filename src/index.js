const express = require('express');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const bodyParse = require('body-parser')
const session = require('express-session');
const cookies = require('cookie-parser');
const helmet = require('helmet');
//Router
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');
const app = express();
//Helmet protege de inyeccion de scripts entres sitios XSS
//app.use(helmet())
//Desactivar el header x-powered-by: express
app.disable('x-powered-by');
//Urlencoded - Manejo de datos desde los formularios
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
//session
app.set('trust proxy', 1);
app.use(session({
  secret: "casa-partida",
  resave: false,
  saveUninitialized: true
}));
//Cookie
app.use(cookies());
//Middle de aplicación
app.use(userLoggedMiddleware);
//Morgan
app.use(morgan('dev'));
//reconocer put y delete
app.use(methodOverride('_method'))
//EJS Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayout);
app.set('layout', './layouts/main');
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

module.exports = app;
