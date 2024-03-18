const fetch = require('node-fetch');

const read = async (req, res) => {
    fetch('https://newsapi.org/v2/everything?q=keyword&apiKey=74963fa9120b4f8a8355050f9a69b204')
        .then(response => response.json())
        .then(newsapi => {
            console.log(newsapi.articles);
            let articles = newsapi.articles;
            //return res.send(articles)
            //return res.render('news', {news: articles});
        })
}

module.exports = read;