const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const morgan = require('morgan');
const expressLayout = require('express-ejs-layouts');

//Router
const mainRouter = require('./router/mainRouter');
const articleRouter = require('./router/articleRouter');
const dashboardRouter = require('./router/dashboardRouter');
const accessRouter = require('./router/access');

//Urlencoded
app.use(express.urlencoded({ extended: true }));
//Morgan
app.use(morgan('dev'));

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

module.exports = app;