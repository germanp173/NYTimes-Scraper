const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');
const cleanStringRegx = /[\t\n\r]/gm;

exports.index = (req, res) => {
    res.render('index');
}

exports.saved = (req, res) => {
    db.Article.find({})
        .then(articles => res.render("saved", {articles}))
        .catch(error => res.render("saved", {error}))
}

exports.scrape = (req, res) => {

    // Scrape techcrunch for their latest tech news articles.
    axios.get("https://techcrunch.com/")
        .then((response) => {

            // Load HTML body into cheerio.
            let $ = cheerio.load(response.data);
            let articles = [];
            // Extract every article using the following set of classes.
            $(".post-block.post-block--image.post-block--unread").each(function (i, element) {
                // Save an empty result object
                let articleData = extractArticleData($(this));
                articles.push(articleData);
            });

            // Send a message to the client
            res.json(articles);
        })
        .catch(error => res.json({ error }));
}

exports.save = (req, res) => {
    db.Article.create(req.body)
        .then(() => res.json({result: "Success"}))
        .catch(error => res.json({error}));
}

exports.clear = (req, res) => {
    db.Article.remove({})
        .then(() => res.json({result: "Success"}))
        .catch(error => res.json({error}));
}

function extractArticleData(article) {
    let result = {};

    result.headline = article
        .children("header")
        .children("h2")
        .children("a")
        .text()
        .replace(cleanStringRegx, '');
    result.link = article
        .children("header")
        .children("h2")
        .children("a")
        .attr("href")
        .replace(cleanStringRegx || '', '');
    result.content = article
        .children("div")
        .text()
        .replace(cleanStringRegx, '');
    result.imageUrl = article
        .children("footer")
        .children("figure")
        .children("a")
        .children("img")
        .attr("src")
        .replace(cleanStringRegx, '');
    return result;
}