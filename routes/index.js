"use strict";

const routes = require('express').Router();

/**
 * All functionality around the articles.
 */
routes.use('/articles', require('../app/article'));
/**
 * Catch all which renders a 404!
 * @todo: create en error domain
 */
routes.all('*', (req, resp) => {
    let message = 'Unhandled request to '+req.url;
    console.error(message);
    resp.status(404);
    resp.render('404.njk', {
          errorStatus   : 404
         , message      : 'Page not found'
    })
});

module.exports = routes;