const app = require('express')();

const crawler = require('./routes/crawler');

app.route(crawler(app))

app.get('/', (req, res) => {
    let routes = [];
    app._router.stack.forEach(function (middleware) {
        if (middleware.route && middleware.route.stack.length > 0) { // routes registered directly on the app
            routes.push(middleware.route);
        } 
    })
    res.json(routes)
})


app.set('port', 80 || process.env.production.port);

module.exports = app;