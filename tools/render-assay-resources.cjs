const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'assets/app.js'), 'utf8');
for (const id of ['apj', 'pd1']) {
  const c = {document:{getElementById:name => name === 'site-config' ? {textContent:JSON.stringify({mode:'website',root:'../../',target:id})} : null}};
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/data.js'), 'utf8'), c);
  vm.runInContext(app.slice(0, app.indexOf('function detail(')), c);
  c.target = c.TARGET_ATLAS_DATA.targets.find(t => t.id === id);
  const render = expression => vm.runInContext(expression, c).replace(/href="#target\/([^/]+)\/([^\"]+)"/g, 'href="../../targets/$1/#$2"');
  const assays = render('assaySection(target)');
  const resources = render('resourceSection(target)');
  const file = path.join(root, 'targets', id, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const a = html.indexOf('<section id="assays"');
  const b = html.indexOf('<section id="resources"', a);
  const end = html.indexOf('</section>', b) + 10;
  if (a < 0 || b < 0 || end < 10) throw Error('Static section boundaries not found: ' + id);
  html = html.slice(0,a) + assays + resources + html.slice(end);
  html = html.replace('data-section="resources"><span>四</span>产品与资料', 'data-section="resources"><span>四</span>资料与文献');
  fs.writeFileSync(file, html);
  console.log(id + ': rendered method products and literature-only resources.');
}
