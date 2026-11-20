const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'assets/data.js');
const {drafts,buildTarget}=require('./new-targets-20261120.cjs');
const context={};vm.runInNewContext(fs.readFileSync(file,'utf8'),context);
const db=JSON.parse(JSON.stringify(context.TARGET_ATLAS_DATA));
const backup=path.join(root,'output/backups/before-new-targets-20261120');
fs.mkdirSync(backup,{recursive:true});
if(!fs.existsSync(path.join(backup,'data.js')))fs.copyFileSync(file,path.join(backup,'data.js'));
for(const draft of drafts){
 const {target,drugs}=buildTarget(draft);
 assert.equal(target.biology.length,9);
 assert(target.biologyIntro.length>=180&&target.biologyIntro.length<=300,`${target.id}: intro length ${target.biologyIntro.length}`);
 assert(!target.biologyMap.image);
 const refs=new Set(target.sources.map(s=>s.id));
 target.biology.forEach(b=>b.refs.forEach(r=>assert(refs.has(r))));
 target.assays.forEach(a=>a.refs.forEach(r=>assert(refs.has(r))));
 target.products.forEach(p=>assert(refs.has(p.ref)));
 // Rerunning the authored update is safe without adding duplicate entries.
 const i=db.targets.findIndex(t=>t.id===target.id);
 if(i<0)db.targets.push(target);else db.targets[i]=target;
 for(const drug of drugs){const j=db.drugCatalog.findIndex(d=>d.id===drug.id);if(j<0)db.drugCatalog.push(drug);else db.drugCatalog[j]=drug;}
}
assert.equal(new Set(db.targets.map(t=>t.id)).size,db.targets.length);
db.updatedOn='2026-11-20';
fs.writeFileSync(file,'globalThis.TARGET_ATLAS_DATA='+JSON.stringify(db)+';\n');
console.log(JSON.stringify({added:drafts.map(t=>t.name),total:db.targets.length,intros:drafts.map(d=>[d.id,d.biologyIntro.length])},null,2));
