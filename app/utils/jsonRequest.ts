const request = require('xhr-request');
// import * as request from 'xhr-request';

const jsonRequest = (url, method, errorCallback, successCallback) => {
    const options = {
        json: true,
        method : method || 'GET',
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
