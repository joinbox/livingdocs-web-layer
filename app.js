"use strict";

const     express   = require('express')
        , nunjucks  = require('nunjucks')
        , defaultPort = 8888;

let       appConfig = require('./config/app')
        , app       = express();

nunjucks.configure('www/templates', {
      autoescape: true
    , express   : app
    , watch     : true
});

app.use('/', require('./routes'));
app.listen(appConfig.port || defaultPort, () => {
   console.log('App listening on port ' + (appConfig.port || defaultPort));
});