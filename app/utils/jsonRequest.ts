const request = require('xhr-request');
// import * as request from 'xhr-request';

const jsonRequest = (url, errorCallback, successCallback) => {
    const options = {
        json: true,
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
