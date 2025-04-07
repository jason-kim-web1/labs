const { parse } = require('url');
const next = require('next');

const app = next({ dev: true });
const handle = app.getRequestHandler();

const { createServer } = require('https');
const fs = require('fs');

app.prepare().then(() => {
  const server = createServer(
    {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem'),
    },
    (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  ).listen(443);
  
  console.log('> HTTPS Server listening');
});
