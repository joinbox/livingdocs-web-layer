"use strict";

const     express   = require('express')
        , nunjucks  = require('nunjucks')
        , path      = require('path')
        , defaultPort    = 8888
        , app       = express()
        , appConfig = require('./config/app')
        , webLayer  = require('./app/web-layer');

let options = {
    api : {
          host      : 'https://production-server.hosted.livingdocs.io'
        , prefix    : 'public'
    }
    , render : {
        viewFolders  : [path.join(__dirname, 'app/custom/templates')]
    }
};

let webRoutes = webLayer(app, options);

// set the root for static files
app.use(express.static(appConfig.staticRoot));
// setup the custom routes
app.use('', require('./routes'));
// setup the routes for the web-layer
// it does not make too much sense to expose them...
app.use('/', webRoutes);

/**
 * Start the server.
 */
app.listen(appConfig.port || defaultPort, () => {
   console.log('App listening on port ' + (appConfig.port || defaultPort));
});