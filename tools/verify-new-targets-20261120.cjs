const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
function read(file){const c={};vm.runInNewContext(fs.readFileSync(file,'utf8'),c);return JSON.parse(JSON.stringify(c.TARGET_ATLAS_DATA));}
const db=read(path.join(root,'assets/data.js'));
const before=read(path.join(root,'output/backups/before-new-targets-20261120/data.js'));
const {drafts}=require('./new-targets-20261120.cjs');
assert.equal(db.targets.length,before.targets.length+10);
before.targets.forEach(t=>assert.deepEqual(db.targets.find(x=>x.id===t.id),t,`${t.id}: existing data changed`));
before.drugCatalog.forEach(d=>assert.deepEqual(db.drugCatalog.find(x=>x.id===d.id),d,`${d.id}: existing drug changed`));
assert.equal(new Set(db.drugCatalog.map(d=>d.id)).size,db.drugCatalog.length);
const collator=new Intl.Collator('en',{numeric:true,sensitivity:'base'});
const sorted=[...db.targets].sort((a,b)=>collator.compare(/^[a-z]/i.test(a.name)?a.name:a.id,/^[a-z]/i.test(b.name)?b.name:b.id)).map(t=>t.id);
const pages=['index.html',...db.targets.map(t=>`targets/${t.id}/index.html`)];
for(const relative of pages){
 const html=fs.readFileSync(path.join(root,relative),'utf8');
 const nav=html.match(/<nav class="target-nav"[\s\S]*?<\/nav>/)[0];
 const ids=[...nav.matchAll(/href="[^"#]*targets\/([^/]+)\//g)].map(m=>m[1]);
 assert.deepEqual(ids,sorted,`${relative}: sorted navigation`);
 assert(html.includes('class="nav-count">112</span>'));
 assert(!html.includes('href="#target/'),`${relative}: unresolved SPA links`);
}
for(const d of drafts){
 const t=db.targets.find(t=>t.id===d.id),html=fs.readFileSync(path.join(root,'targets',t.id,'index.html'),'utf8');
 assert(t.biologyIntro.length>=180&&t.biologyIntro.length<=260);
 assert(!t.biologyMap.image&&!html.includes('bio-map-image'));
 assert.equal(t.biology.length,9);assert.equal(t.assays.length,6);
 assert.equal(t.biologyReading.topics.length,9);
 for(const key of ['tasks','modalities','resourceKinds']){const allowed=new Set(before.targets.flatMap(t=>t[key]));t[key].forEach(value=>assert(allowed.has(value),`${t.id}: existing ${key} taxonomy ${value}`));}
 const refs=new Set(t.sources.map(s=>s.id));assert.equal(refs.size,t.sources.length);
 const verify=value=>{if(Array.isArray(value))value.forEach(verify);else if(value&&typeof value==='object'){for(const [key,v] of Object.entries(value)){if(['refs','methodRefs','relatedRefs','evidenceRefs'].includes(key))v.forEach(id=>assert(refs.has(id),`${t.id}: ${key} ${id}`));else if(key==='ref')assert(refs.has(v),`${t.id}: product/drug ref ${v}`);else verify(v);}}};verify(t);
 for(let i=1;i<=9;i++){
  const section=html.slice(html.indexOf(`id="bio-topic-${i}"`),html.indexOf('</article>',html.indexOf(`id="bio-topic-${i}"`)));
  assert(section.indexOf('class="bio-topic-body"')<section.indexOf('class="bio-evidence-list"'));
  assert(section.includes('文献背景')&&section.includes('解读边界'));
 }
 t.drugLinks.forEach(l=>{const drug=db.drugCatalog.find(d=>d.id===l.drugId);assert(drug&&drug.relatedTargets.includes(t.id));});
}
const result={date:'2026-11-20',totalTargets:db.targets.length,added:drafts.map(t=>t.id),newTopics:90,newMethods:60,newProducts:db.targets.filter(t=>drafts.some(d=>d.id===t.id)).reduce((n,t)=>n+t.products.length,0),oldTargetsUnchanged:true,checks:['All 113 static navigation lists are sorted and complete','Ten text mechanism maps without generated image assets','All nine details precede evidence annotations','Existing target and drug data unchanged','New references, product links and representative drugs resolve']};
fs.mkdirSync(path.join(root,'output/qa'),{recursive:true});fs.writeFileSync(path.join(root,'output/qa/new-targets-20261120.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
