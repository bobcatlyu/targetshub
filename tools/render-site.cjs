// Render the shared browser templates to static HTML, preserving each page's head
// and site footer. This keeps navigation, counts and no-JS pages in sync with data.
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const data=fs.readFileSync(path.join(root,'assets/data.js'),'utf8');
const dbContext={};vm.runInNewContext(data,dbContext);
const db=dbContext.TARGET_ATLAS_DATA;
const template=fs.readFileSync(path.join(root,'targets/il13/index.html'),'utf8');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render(target){
 const nodes=new Map();
 const node=key=>{if(!nodes.has(key))nodes.set(key,{innerHTML:'',textContent:'',value:'',hidden:false,insertAdjacentHTML(_where,html){this.innerHTML+=html;}});return nodes.get(key);};
 const config={mode:'website',root:target?'../../':'./',target:target?.id||''};
 const c={document:{getElementById:id=>id==='site-config'?{textContent:JSON.stringify(config)}:node('#'+id),querySelector:node,querySelectorAll:()=>[]},location:{hash:''},localStorage:{getItem:()=>null}};
 vm.createContext(c);vm.runInContext(data,c);
 vm.runInContext(app.slice(0,app.indexOf('function detail(')),c);
 if(target){
  // Only evaluate the template assignment; the rest sets up browser scrolling.
  const detail=app.slice(app.indexOf('function detail('),app.indexOf(';let scrollFrame=0;',app.indexOf('function detail(')))+';}';
  vm.runInContext(detail,c);c.target=c.TARGET_ATLAS_DATA.targets.find(t=>t.id===target.id);vm.runInContext('detail(target)',c);
 }else vm.runInContext('renderIndex()',c);
 let html=node('#app').innerHTML;
 if(!target){
  for(const id of ['filter-panel','active-filters','results'])html=html.replace(`<div id="${id}"></div>`,`<div id="${id}">${node('#'+id).innerHTML}</div>`);
  html=html.replace('id="result-count" role="status" aria-live="polite"></span>',`id="result-count" role="status" aria-live="polite">${node('#result-count').textContent}</span>`);
 }
 return html.replace(/href="#target\/([^/"#]+)(?:\/([^"#]+))?"/g,(_m,id,section)=>`href="${config.root}targets/${id}/${section?'#'+section:''}"`).replace(/href="#(index|saved)"/g,(_m,id)=>`href="${config.root}${id==='saved'?'#saved':''}"`);
}

function page(target){
 const file=path.join(root,target?'targets/'+target.id+'/index.html':'index.html');
 const exists=fs.existsSync(file);
 const original=exists?fs.readFileSync(file,'utf8'):template;
 let head=original.slice(0,original.indexOf('<div id="app">'));
 if(!exists){
  const title=escape(target.name+' · Targets Hub'),description=escape(target.summary);
  head=head.replace(/(<meta name="description" content=")[^"]*/,'$1'+description).replace(/(<meta property="og:description" content=")[^"]*/,'$1'+description).replace(/(<meta property="og:title" content=")[^"]*/,'$1'+title).replace(/<title>[^<]*<\/title>/,'<title>'+title+'</title>');
 }
 const footerStart=original.indexOf('<footer class="site-notice">');
 if(!head||footerStart<0)throw Error('Missing static template boundaries: '+file);
 let tail=original.slice(footerStart);
 const config={mode:'website',root:target?'../../':'./',target:target?.id||''};
 tail=tail.replace(/(<script id="site-config" type="application\/json">)[\s\S]*?(<\/script>)/,(_m,a,b)=>a+JSON.stringify(config)+b);
 fs.mkdirSync(path.dirname(file),{recursive:true});
 fs.writeFileSync(file,head+'<div id="app">'+render(target)+'</div>'+tail);
}
db.targets.forEach(page);page(null);
const aboutFile=path.join(root,'about/index.html');
let about=fs.readFileSync(aboutFile,'utf8');
about=about.replace(/(<h3>收录范围<\/h3><p>)\d+ 个靶点／通路主题，包含 \d+ 个独立药物、\d+ 条靶点—药物关联、\d+ 项实验任务和 \d+ 项技术资源。/,(_m,prefix)=>prefix+`${db.targets.length} 个靶点／通路主题，包含 ${db.drugCatalog.length} 个独立药物、${db.targets.reduce((n,t)=>n+t.drugLinks.length,0)} 条靶点—药物关联、${db.targets.reduce((n,t)=>n+t.assays.length,0)} 项实验任务和 ${db.targets.reduce((n,t)=>n+t.products.length,0)} 项技术资源。`);
fs.writeFileSync(aboutFile,about);
console.log('Rendered '+db.targets.length+' target pages and index.');
console.log(require('./version-assets.cjs').versionAssets());
