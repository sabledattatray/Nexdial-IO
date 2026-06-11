const fs = require('fs');
const path = require('path');

const directoryPath = 'd:\\Nexdial\\Nexdial';

const IGNORE_DIRS = ['.git', 'node_modules', '.next', 'dist', 'build', 'public'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!IGNORE_DIRS.includes(f)) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const replacements = [
  { regex: /Nexdial/g, replacement: 'Nexdial' }
];

walkDir(directoryPath, (filePath) => {
  // Only process text-like files based on extension
  const ext = path.extname(filePath).toLowerCase();
  const validExts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md'];
  
  if (validExts.includes(ext) || filePath.endsWith('.env')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    for (const r of replacements) {
      if (r.regex.test(content)) {
        content = content.replace(r.regex, r.replacement);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
