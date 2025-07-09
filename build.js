const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const distDir = path.join(projectRoot, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

// copy public files
fs.cpSync(path.join(projectRoot, 'public'), distDir, { recursive: true });
// copy src directory
fs.cpSync(path.join(projectRoot, 'src'), path.join(distDir, 'src'), { recursive: true });

// update index.html paths
const indexPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/\.\.\/src\//g, 'src/');
fs.writeFileSync(indexPath, html);

console.log('Build complete. Files copied to dist/');
