"use strict";

const routes    = require('express').Router()
    , request   = require('request')
    , apiHost   = 'https://production-server.hosted.livingdocs.io';

// @todo: add try catch around json parse
// @todo: check if a web channel is available

routes.get('/:publicationId.:format?', (req, resp, next) => {

    var   targetPath    = '/public/publications/'+req.params.publicationId
        , targetUrl     = apiHost + targetPath;

    request.get(targetUrl, (error, response, body) => {
        var content;
        if(error || response.statusCode !== 200){
            console.error(error, response.statusCode);
            // just delegate to the routing
            return next();
        }
        content = JSON.parse(body);
        resp.render('index.njk', { content: content });
    });
});

module.exports = routes;