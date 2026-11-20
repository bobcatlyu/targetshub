// Use content versions so cached JS/data/CSS cannot overwrite newly deployed HTML.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const assets = ['app.js', 'data.js', 'style.css'];

function versionAssets({check = false} = {}) {
  const versions = Object.fromEntries(assets.map(name => {
    // Git checks out CRLF on Windows and LF on the host; both represent one version.
    const text = fs.readFileSync(path.join(root, 'assets', name), 'utf8').replace(/\r\n/g, '\n');
    return [name, crypto.createHash('sha256').update(text).digest('hex').slice(0, 12)];
  }));
  const pages = ['index.html', '404.html', 'about/index.html'];
  for (const entry of fs.readdirSync(path.join(root, 'targets'), {withFileTypes: true})) {
    if (entry.isDirectory()) pages.push(`targets/${entry.name}/index.html`);
  }
  let changed = 0;
  for (const relative of pages) {
    const file = path.join(root, relative);
    const html = fs.readFileSync(file, 'utf8');
    const next = html.replace(/((?:src|href)="[^"?#]*assets\/)(app\.js|data\.js|style\.css)(?:\?[^"#]*)?(#[^"]*)?"/g,
      (_match, prefix, name, fragment = '') => `${prefix}${name}?v=${versions[name]}${fragment}"`);
    if (next !== html) {
      changed++;
      if (!check) fs.writeFileSync(file, next);
    }
  }
  if (check && changed) throw Error(`${changed} pages need asset versions. Run node tools/version-assets.cjs before pushing.`);
  return {pages: pages.length, changed, versions};
}

module.exports = {versionAssets};
if (require.main === module) console.log(JSON.stringify(versionAssets({check: process.argv.includes('--check')})));
