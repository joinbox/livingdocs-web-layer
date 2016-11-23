"use strict";

const request = require('request')
    , routes = require('express').Router();

function handleArticle(req, resp, next){
    let entityId = req.params.publicationId;
    req.ld.layout = req.ld.layout || 'default/layout-article';
    req.ld.forwardToApi(req, 'publications', entityId, next);
}

routes.get('/', (req, resp, next) => {
    let defaultId = 2918;
    req.ld.layout = 'custom/layout-page';
    req.ld.forwardToApi(req, 'publications', defaultId, next);
});

routes.get('/:category/:subCategory?/:publicationId.:format?$', (req, resp, next) => {
    // check your layout!
    let category = req.params.category;
    if(category === 'sports'){
        req.ld.layout = `custom/layout-sports`;
    }
    handleArticle(req, resp, next);
});
/**
 * @todo: ugh, the error handling is bullshit!
 */
routes.get('/articles/:publicationId.:format?$', handleArticle);
routes.get('*', (req, resp, next)=>{
    next();
    //req.ld.forwardToError({}, req);
});

module.exports = routes;