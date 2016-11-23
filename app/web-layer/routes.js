"use strict";

const routes = require('express').Router();
routes.get('/api/:entity/:entityId', (req, resp, next)=>{

    let   { entityId , entity } = req.params;

    req.ld.api.query(entityId, entity)
        .then((response)=>{
            req.ld.renderingContext.entities[entity] = response;
            req.ld.forwardToRendering(req, next);
        }).catch((error)=>{
            req.ld.forwardToError(req, error);
        });
});

routes.use('/error', (err, req, resp, next)=>{
    let view = req.ld.getErrorLayout();
    resp.render(view, err);
});

routes.use('/render', (req, resp, next) => {
    let   layout  = req.ld.getLayout()
        , context = req.ld.formatRenderingContext();

    resp.render(layout, context);
});

module.exports = routes;