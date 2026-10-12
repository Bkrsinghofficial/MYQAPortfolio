const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.json': 'application/json',
  '.pdf':  'application/pdf',
};

// Text types eligible for gzip compression
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg']);

// Cache-Control policy per file type
function getCacheControl(ext) {
  switch (ext) {
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.webp':
    case '.svg':
      // Long-lived immutable cache for images — mobile browsers cache them across sessions
      return 'public, max-age=31536000, immutable';
    case '.css':
    case '.js':
      // 1-hour cache with revalidation — versioned via ?v= query string in HTML
      return 'public, max-age=3600, must-revalidate';
    case '.pdf':
      return 'public, max-age=86400';
    default:
      // HTML: always revalidate so content changes are seen immediately
      return 'no-cache';
  }
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // ETag based on file size + last modified time (fast, no hashing)
    const etag = `"${stats.size}-${stats.mtimeMs.toFixed(0)}"`;

    // 304 Not Modified — skip sending body if client has a fresh copy
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304);
      res.end();
      return;
    }

    const responseHeaders = {
      'Content-Type':  contentType,
      'Cache-Control': getCacheControl(ext),
      'ETag':          etag,
      'Last-Modified': stats.mtime.toUTCString(),
      // Allow cross-origin image use (canvas taint-free)
      'Access-Control-Allow-Origin': '*',
    };

    if (ext === '.pdf') {
      const fileName = path.basename(filePath);
      responseHeaders['Content-Disposition'] = `attachment; filename="${fileName}"`;
    }

    // Gzip compression for text assets
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const canGzip = COMPRESSIBLE.has(ext) && acceptEncoding.includes('gzip');

    if (canGzip) {
      responseHeaders['Content-Encoding'] = 'gzip';
      responseHeaders['Vary'] = 'Accept-Encoding';
      res.writeHead(200, responseHeaders);
      const gzip = zlib.createGzip({ level: 6 });
      fs.createReadStream(filePath).pipe(gzip).pipe(res);
    } else {
      responseHeaders['Content-Length'] = stats.size;
      res.writeHead(200, responseHeaders);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
