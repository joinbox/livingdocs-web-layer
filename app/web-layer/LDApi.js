"use strict";
const request = require('request');

class LDApi {

    constructor(host, apiPrefix, defaultHeaders){
        this.host           = host;
        this.apiPrefix      = apiPrefix || false;
        this.defaultHeaders = defaultHeaders || {};
    }

    createUrl(endpoint){
        return [this.host, endpoint].join('/');
    }

    createEndpoint(id, entity){
        let segments = [];
        if(this.apiPrefix !== false){
            segments.push(this.apiPrefix);
        }
        if(entity){
            segments.push(entity);
        }
        segments.push(id);
        return segments.join('/');
    }

    queryEndpoint(endpoint){
        return new Promise((resolve, reject)=>{
            let targetUrl = this.createUrl(endpoint);
            request.get(targetUrl, (error, response, body) => {

                let   responseContent
                    , parseError;

                if(error){
                    reject(error);
                    return;
                }
                if(response.statusCode !== 200){
                    let message = `Unable to load entity, got status code ${response.statusCode}`;
                    reject(message, response.statusCode);
                    return;
                }
                try {
                    responseContent = JSON.parse(body);
                } catch(e){
                    parseError = e;
                }

                if(parseError) {
                    reject(parseError.message, 500);
                    return;
                }

                resolve(responseContent);
            });
        });
    }
    query(id, entity){
        if(entity === 'navigation'){
            return this.fakeNavigation();
        }
        return this.queryEndpoint(this.createEndpoint(id, entity));
    }

    fakeNavigation(){
        return Promise.resolve({
              identifier: 'Fake Navigation'
            , items: {
                  name: 'On our mark'
                , url : '/articles/2909.html?project_id=319'
                , children : [

                ]
            }
        })
    }
}

module.exports = LDApi;