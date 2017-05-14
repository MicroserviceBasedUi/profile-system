const http = require('http');
const fs = require('fs');
const url = require('url');
const tunnel = require('./insightTunnel');
const fileServer = require('./serveFiles');

// you can pass the parameter in the command line. e.g. node index.js 9001
const port = process.argv[2] || 9001;
const config = JSON.parse(fs.readFileSync('appconfig.json', 'utf8'));

http.createServer(function (request, response) {
  if (request.url.startsWith("/components")) {
    fileServer.serveFiles(request, response, '.' + request.url);
  } else if (request.url.startsWith("/insight")) {
    const parsedUrl = url.parse(request.url);
    let insightUrl = parsedUrl.pathname.replace('/insight','');
    tunnel.tunnelInsightRequest(config, request, response, insightUrl);
  } else {
    // parse URL
    const parsedUrl = url.parse(request.url);
    // extract URL path
    let pathname = `../client/dist${parsedUrl.pathname.replace('/client','')}`;
    console.log(pathname);
    fileServer.serveFiles(request, response, pathname);    
  }
}).listen(parseInt(port));

console.log(`Running on port ${port} and proxying request to base URL ${config.baseUrl} with user ${config.user}; Serving files from 'components'`);
