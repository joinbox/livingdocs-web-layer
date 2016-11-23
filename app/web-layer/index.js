"use strict";
const     path  = require('path')
        , nunjucks = require('nunjucks')
        , LDApi  = require('./LDApi')
        , routes = require('./routes');

module.exports = function(app, options){

    let   apiOptions         = options.api || {}
        , api                = new LDApi(apiOptions.host, apiOptions.prefix, apiOptions.defaultHeaders)
        , environmentOptions = options.render || {}
        , viewFolders        = (environmentOptions.viewFolders || []).concat(path.join(__dirname, 'templates'))
        , env                = nunjucks.configure(viewFolders, {
              autoescape: true
            , express: app
            , watch: true
          });

    app.set('view engine', 'njk');

    app.use((req, resp, next)=>{

        req.ld = {
              renderingContext  : {
                  entities: {}
              }
            , layout            : 'default/layout-page'
            , api               : api

            , forwardToError    : function(err, req, resp, next){
                req.url = '/error';
                next(err);
            }
            , forwardToApi      : function(req, entityName, entityId, next){
                req.url = `/api/${entityName}/${entityId}`;
                next('route');
            }

            , forwardToRendering : function(req, next, layout){
                req.url = `/render`;
                if(layout){
                    req.ld.layout = layout;
                }
                next('route');
            }

            , getLayout : function(){
                return this.layout;
            }
            // @todo: this should be modifiable (a layout might expect a different data structure)
            , formatRenderingContext : function(){
                var metaData
                    , context = {};

                Object.keys(this.renderingContext.entities).forEach((entityName)=>{
                    let result = this.renderingContext.entities[entityName];
                    context[entityName] = result.channels.web;
                    if(!metaData){
                        context.metadata = result.metadata;
                    }
                });
                return context;
            }
        };
        next();
    });

    return routes;
};