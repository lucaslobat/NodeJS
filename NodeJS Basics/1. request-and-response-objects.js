const http = require('http');
const fs = require('fs');

/* This function will be executed by every incoming request */
const server = http.createServer((req, res) => {
  const requestURL = req.url;
  const requestMethod = req.method;

  if (requestURL === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<header><title>Enter message</title></header>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (requestURL === '/message' && requestMethod === 'POST') {
    fs.writeFileSync('message.txt', 'Dummy data');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<header><title>NodeJS Basics</title></header>');
  res.write('<body><h1>Welcome to NodeJS Basics</h1></body>');
  res.write('</html>');
  return res.end();
});

server.listen(3000);