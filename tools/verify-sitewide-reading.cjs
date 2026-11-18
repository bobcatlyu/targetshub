const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
const backup=path.join(root,'output/backups/before-sitewide-20261118');
function data(base){const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(base,'assets/data.js'),'utf8'),c);return JSON.parse(JSON.stringify(c.TARGET_ATLAS_DATA));}
const db=data(root),before=data(backup);
const summary={pages:db.targets.length,biologyTopics:0,products:0,associations:0,unmatchedMethods:0,sourceRecords:0,checks:[]};
const normalize=s=>s.replace(/>\s+</g,'><').trim();
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const c={document:{getElementById:n=>n==='site-config'?{textContent:JSON.stringify({mode:'website',root:'../../'})}:null}};
vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8'),c);vm.runInContext(app.slice(0,app.indexOf('function detail(')),c);
for(const t of db.targets){
 const old=before.targets.find(o=>o.id===t.id);
 assert.deepEqual(t.biology,old.biology,`${t.id}: original biology`);
 assert.deepEqual(t.biologyExpanded,old.biologyExpanded,`${t.id}: source date`);
 assert.deepEqual(t.sources,old.sources,`${t.id}: references and dates`);
 assert.deepEqual(t.flow,old.flow,`${t.id}: existing mechanism`);
 assert.equal(t.products.length,old.products.length,`${t.id}: products retained`);
 t.products.forEach((p,i)=>{const strip=p=>{const o={...p};delete o.id;return o;};assert.deepEqual(strip(p),strip(old.products[i]),`${t.id}: product configuration`);});
 old.assays.forEach((a,i)=>{for(const k of Object.keys(a))if(!['id','resourceLinks','methodRefs','resourceGap'].includes(k))assert.deepEqual(t.assays[i][k],a[k],`${t.id}: original assay ${i} ${k}`);});
 if(['apj','calcr-amy3'].includes(t.id))assert.deepEqual(t.biologyReading,old.biologyReading,`${t.id}: existing grouped reading`);
 assert.equal(t.resourcesMode,'literature');
 assert.equal(t.biologyReading.topics.length,9);
 assert.deepEqual(t.biologyReading.groups.flatMap(g=>g.topics),[0,1,2,3,4,5,6,7,8]);
 const sourceIds=new Set(t.sources.map(s=>s.id));
 const checkRefs=ids=>(ids||[]).forEach(id=>assert(sourceIds.has(id),`${t.id}: source ${id}`));
 t.biology.forEach(b=>checkRefs(b.refs));
 t.biologyReading.topics.forEach(b=>{assert(b.key?.length);b.evidence.forEach(e=>checkRefs(e[2]));});
 t.products.forEach(p=>{checkRefs([p.ref,...(p.relatedRefs||[])]);assert(t.assays.some(a=>a.resourceLinks.some(l=>l.productId===p.id)),`${t.id}: product not linked ${p.id}`);});
 t.assays.forEach(a=>{assert(a.id);checkRefs(a.refs);checkRefs(a.methodRefs);for(const l of a.resourceLinks)assert(t.products.some(p=>p.id===l.productId));});
 const html=fs.readFileSync(path.join(root,'targets',t.id,'index.html'),'utf8');
 assert.equal((html.match(/class="bio-keypoint"/g)||[]).length,9,`${t.id}: summaries`);
 assert.equal((html.match(/class="bio-topic-body"/g)||[]).length,9,`${t.id}: expanded bodies`);
 assert(!html.includes('展开原理与研究依据'));
 assert(!html.includes('class="product-list"'));
 assert(html.includes('data-section="resources"><span>四</span>资料与文献'));
 assert(html.includes('<span>一</span>靶点生物学'));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${t.id}: duplicate anchor`);
 for(const p of t.products)assert(ids.includes('product-'+p.id),`${t.id}: canonical product anchor`);
 for(const b of t.biology)for(const p of b.paragraphs||[{text:b.text}])assert(html.includes(vm.runInContext('e',c)(p.text)),`${t.id}: original text in static page`);
 c.target=c.TARGET_ATLAS_DATA.targets.find(x=>x.id===t.id);
 const render=expr=>vm.runInContext(expr,c).replace(/href="#target\/([^/]+)\/([^"]+)"/g,'href="../../targets/$1/#$2"');
 const bio=html.slice(html.indexOf('<div class="biology-expanded">'),html.indexOf('<div class="distinction">'));
 assert.equal(normalize(bio),normalize(render('biologyContent(target)')),`${t.id}: static/dynamic biology parity`);
 const assayStart=html.indexOf('<section id="assays"'),resStart=html.indexOf('<section id="resources"',assayStart),end=html.indexOf('</section>',resStart)+10;
 assert.equal(normalize(html.slice(assayStart,end)),normalize(render('assaySection(target)+resourceSection(target)')),`${t.id}: static/dynamic resources parity`);
 summary.biologyTopics+=t.biology.length;summary.products+=t.products.length;summary.sourceRecords+=t.sources.length;
 summary.associations+=t.assays.reduce((n,a)=>n+a.resourceLinks.length,0);summary.unmatchedMethods+=t.assays.filter(a=>!a.resourceLinks.length).length;
}
// Verify target-to-target and source/product hashes resolve, including old incoming product links.
for(const t of db.targets){
 const file=path.join(root,'targets',t.id,'index.html'),html=fs.readFileSync(file,'utf8');
 for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
  if(!href.startsWith('../../targets/'))continue;
  const [relative,hash]=href.split('#'),dest=path.join(path.resolve(path.dirname(file),relative),'index.html');
  assert(fs.existsSync(dest),`${t.id}: missing target ${href}`);
  if(hash)assert(fs.readFileSync(dest,'utf8').includes(`id="${hash}"`),`${t.id}: broken anchor ${href}`);
 }
}
summary.checks=['Original biology, methods, product configurations, sources and source dates preserved','Nine summaries and expanded details per page','All products associated with methods and canonical anchors preserved','Every local target/source/product link resolves; no duplicate anchors','Static HTML matches the shared renderer','Existing APJ/CALCR reading content and mechanism flows preserved'];
fs.mkdirSync(path.join(root,'output/qa'),{recursive:true});
fs.writeFileSync(path.join(root,'output/qa/sitewide-reading-20261118.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
