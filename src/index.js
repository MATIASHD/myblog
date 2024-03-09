const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const morgan = require('morgan');
const articleRouter = require('./router/articleRouter');
const mainRouter = require('./router/mainRouter');
const dashboardRouter = require('./router/dashboardRouter')
const expressLayout = require('express-ejs-layouts');


//Public content
app.use(express.static('public'));

//Morgan
app.use(morgan('dev'));

//EJS Config
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(articleRouter);
app.use(mainRouter);
app.use(dashboardRouter);

module.exports = app;