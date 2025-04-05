const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10);
const app = next({ dev: true });
const handle = app.getRequestHandler();

if (port === 443) {
  const { createServer } = require('https');
  const fs = require('fs');

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
   
    console.log('> HTTPS Server listening');
  });
} else {
  const { createServer } = require('http');

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    }).listen(port);
  
    console.log('> HTTP Server listening');
  })
}
