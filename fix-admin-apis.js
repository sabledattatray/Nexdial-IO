const fs = require('fs');
const path = require('path');
const walk = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const files = walk('src/app/api/admin');
files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    const targetString = '(session.user as any).role !== "ADMIN"';
    if (content.includes(targetString)) {
      content = content.split(targetString).join('session?.user?.email?.toLowerCase() !== "sabledattatray@gmail.com"');
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  }
});
