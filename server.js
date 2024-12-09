const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle the request URL
  if (req.method === 'GET') {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Get the file extension to set the correct content type
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      default:
        contentType = 'text/html';
    }

    // Read the file and send the response
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        // Handle 404 error if the file is not found
        if (err.code === 'ENOENT') {
          fs.readFile(path.join(__dirname, 'public', '404.html'), (err404, content404) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content404, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(`Server error: ${err.code}`);
        }
      } else {
        // Send the file with the correct content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

//server.requestTimeout = 10000000;
server.timeout = 0

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
