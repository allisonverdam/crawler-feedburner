module.exports = app => {
    let request = require('request')
    var parseString = require('xml2js').parseString;
    let dados = [];
    let base_url = 'http://feeds.feedburner.com/';

    app.route('/feed/:url')
        .get((req, res) => {
            request.get(base_url + req.params.url, (error, response, body) => {
                parseString(body, function (err, result) {
                    for (i in result.rss.channel[0].item) {
                        dados.push({
                            titulo: result.rss.channel[0].item[i].title[0],
                            link: result.rss.channel[0].item[i].link[0],
                            descricao: result.rss.channel[0].item[i].description[0],
                            autor: result.rss.channel[0].item[i]["itunes:author"][0],
                            data_publicacao: result.rss.channel[0].item[i].pubDate[0],
                            media: result.rss.channel[0].item[i]["media:content"][0].$

                        })
                    }
                });

                res.json(dados)
            })
        })

    return app;
}