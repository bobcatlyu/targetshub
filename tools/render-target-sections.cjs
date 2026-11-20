const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');
const ids = process.argv.slice(2);
if (!ids.length) throw Error('Supply at least one target ID.');
for (const id of ids) {
  const c = {document:{getElementById:name => name === 'site-config' ? {textContent:JSON.stringify({mode:'website',root:'../../',target:id})} : null}};
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/data.js'), 'utf8'), c);
  vm.runInContext(app.slice(0, app.indexOf('function detail(')), c);
  c.target = c.TARGET_ATLAS_DATA.targets.find(t => t.id === id);
  if (!c.target) throw Error('Unknown target: ' + id);
  const render = expression => vm.runInContext(expression,c).replace(/href="#target\/([^/]+)\/([^\"]+)"/g,'href="../../targets/$1/#$2"');
  const file = path.join(root,'targets',id,'index.html');
  let html = fs.readFileSync(file,'utf8');
  const bioStart = html.indexOf('<div class="biology-expanded">');
  const bioEnd = html.indexOf('<div class="distinction">',bioStart);
  if (bioStart < 0 || bioEnd < 0) throw Error('Expanded biology boundaries not found: ' + id);
  html = html.slice(0,bioStart) + render('biologyContent(target)') + html.slice(bioEnd);
  const assayStart = html.indexOf('<section id="assays"');
  const resourceStart = html.indexOf('<section id="resources"',assayStart);
  const resourceEnd = html.indexOf('</section>',resourceStart) + 10;
  if (assayStart < 0 || resourceStart < 0 || resourceEnd < 10) throw Error('Assay/resource boundaries not found: ' + id);
  html = html.slice(0,assayStart) + render('assaySection(target)+resourceSection(target)') + html.slice(resourceEnd);
  if (c.target.resourcesMode === 'literature') html = html.replace('data-section="resources"><span>四</span>产品与资料','data-section="resources"><span>四</span>资料与文献');
  fs.writeFileSync(file,html);
  const total = c.TARGET_ATLAS_DATA.targets.reduce((n,t)=>n+t.products.length,0);
  const home = path.join(root,'index.html');
  fs.writeFileSync(home,fs.readFileSync(home,'utf8').replace(/(<div class="metric"><b>)\d+(<\/b><span>技术资源<\/span>)/,(_match,a,b)=>a+String(total).padStart(2,'0')+b));
  console.log(id + ': rendered biology, method products and resources.');
}
// Regenerating one page may follow a global data/script change: version every entry.
console.log('Asset versions: ' + JSON.stringify(require('./version-assets.cjs').versionAssets()));
