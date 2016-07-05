const request = require('xhr-request');
// import * as request from 'xhr-request';

const jsonRequest = (url, opts, errorCallback, successCallback) => {
    const options = {
        json: true,
        method : opts.method || 'GET',
        body : opts.body || {},
        query : opts.query || {},
    };
    request(url, options, (error, response) => {
        if (error) {
            errorCallback(error);
        } else {
            successCallback(response);
        }
    });
};

export default jsonRequest;

