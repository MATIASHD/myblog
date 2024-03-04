const express = require('express');
const app = express();
const path = require('path');
const article = require('./router/articleRouter');
const main = require('./router/mainRouter');

app.use(express.static(path.join(__dirname, 'public')));

//EJS Config
app.set('view engine', 'ejs');

//app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/index.html'));
//})

app.use(article);
app.use(main);

module.exports = app;