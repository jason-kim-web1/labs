const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const port = 443;
const app = next({ dev: true });
const handle = app.getRequestHandler();
 
app.prepare().then(() => {
  createServer(
    {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  ).listen(port);
 
  console.log('> Server listening');
});
