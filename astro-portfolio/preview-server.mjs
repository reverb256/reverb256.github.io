import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const distDir = join(fileURLToPath(import.meta.url), '..', 'dist');
const port = parseInt(process.env.PORT || '4322', 10);

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = createServer(async (req, res) => {
  try {
    let url = req.url.split('?')[0];
    if (url === '/') url = '/index.html';

    const filePath = join(distDir, url);
    // Path traversal guard
    if (!filePath.startsWith(distDir)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }

    const data = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream', 'Content-Length': data.length });
    res.end(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // SPA fallback — serve index.html for client-side routing
      try {
        const data = await readFile(join(distDir, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.end(data);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Preview server running at http://localhost:${port}/`);
});
