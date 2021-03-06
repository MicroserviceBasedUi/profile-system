const httpntlm = require('httpntlm');
const fs = require('fs');

exports.tunnelInsightRequest = function (config, request, response, address) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log(`${request.method} ${address}`);

    httpntlm.get({
        url: config.baseUrl + address,
        username: config.user,
        password: config.password,
        workstation: '',
        domain: config.domain,
        binary: true
    }, function (err, res) {
        if (err) return err;

        console.log(res.headers);
        console.log(res.body);
        response.setHeader('Content-Type', res.headers['content-type']);
        response.end(res.body);
    });
};
