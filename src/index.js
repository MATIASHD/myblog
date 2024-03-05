const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const articleRouter = require('./router/articleRouter');
const mainRouter = require('./router/mainRouter');
const dashboardRouter = require('./router/dashboardRouter')

app.use(express.static('public'));

//Morgan
app.use(morgan('dev'));

//EJS Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(articleRouter);
app.use(mainRouter);
app.use(dashboardRouter);

module.exports = app;