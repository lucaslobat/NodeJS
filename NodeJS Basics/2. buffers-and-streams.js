const http = require('http');
const fs = require('fs');

/* The callback function will be executed by every incoming request */
const server = http.createServer((request, response) => {
  /* The request URL and method that is sent to the server when the user visits the server address */
  const requestURL = request.url;
  const requestMethod = request.method;

  if (requestURL === '/') {
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<header><title>Enter message</title></header>');
    response.write('<body>');
    response.write('<h1>Main page</h1>');
    response.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form>'
    );

    response.write('</body>');
    response.write('</html>');
    return response.end();
  }

  if (requestURL === '/message' && requestMethod === 'POST') {
    const requestBody = [];
    /* Listens to the data stream, receives the chunk of information and stores it in the requestBody array */
    request.on('data', (chunk) => {
      console.log('This is the chunk of data:', chunk);
      requestBody.push(chunk);
    });

    /* When the data stream finishes, parses the result split the content and store it in a file */
    request.on('end', () => {
      parsedBody = Buffer.concat(requestBody).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
      console.log(parsedBody);
    });

    response.statusCode = 302;
    response.setHeader('Location', '/');
    return response.end();
  }
  response.setHeader('Content-Type', 'text/html');
  response.write('<html>');
  response.write('<header><title>NodeJS Basics</title></header>');
  response.write('<body><h1>Welcome to NodeJS Basics</h1></body>');
  response.write('</html>');
  return response.end();
});

server.listen(3000);
