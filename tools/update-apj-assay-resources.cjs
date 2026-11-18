const fs = require('fs');
const vm = require('vm');
const path = require('path');
const file = path.resolve(__dirname, '../assets/data.js');
const c = {};
vm.runInNewContext(fs.readFileSync(file, 'utf8'), c);
const db = c.TARGET_ATLAS_DATA;
const t = db.targets.find(t => t.id === 'apj');
const date = '2026-11-13';
for (const id of ['apj', 'pd1']) db.targets.find(t => t.id === id).resourcesMode = 'literature';
const sources = [
  {id:'apj-product',title:'PathHunter CHO-K1 AGTRL1 Bioassay Kit',org:'Eurofins DiscoverX · 官方产品页',url:'https://www.discoverx.com/catalog/pathhunter-cho-k1-agtrl1-bioassay-kit',supports:'官方检索索引可读产品原理及组件：AGTRL1-PK、β-arrestin-2-EA、CHO-K1 与 EFC 招募读数；页面正文抓取无可读行，货号与批次构建仍待确认。不将招募等同内吞。'},
  {id:'apj-binding-product',title:'APJ Human Apelin GPCR Binding Agonist Radioligand LeadHunter Assay · 2154',org:'Eurofins Discovery · 官方服务目录',url:'https://apac.eurofinsdiscovery.com/catalog/2154',supports:'已读官方目录：人重组 APJ、放射性配体竞争结合、闪烁检测及服务编号 2154；仅对应结合，不证明细胞占有、受体依赖性或激动效应。'},
  {id:'apj-camp-product',title:'cAMP Hunter eXpress AGTRL1 CHO-K1 GPCR Assay',org:'Eurofins DiscoverX · 官方产品页',url:'https://www.discoverx.com/catalog/camp-hunter-express-agtrl1-cho-k1-gpcr-assay',supports:'官方检索索引可读：人野生型 AGTRL1、CHO-K1、Gi/Go、cAMP 下降及 EFC 检测；eXpress 为研究筛选格式，不用于批次放行。页面重定向后无可读正文；货号待确认。'},
  {id:'apj-hibit-product',title:'Nano-Glo HiBiT Extracellular Detection System',org:'Promega · 官方产品页',url:'https://www.promega.com/en/products/protein-detection/protein-quantification/nano-glo-hibit-extracellular-detection-system/',supports:'已读产品页及 TM523：N2420/N2421/N2422；非裂解检测可在胞外接近的 HiBiT 标签蛋白，支持细胞表面量检测。APJ 标签构建与功能需自行验证，非 APJ 专用试剂盒。'},
  {id:'apj-hibit-manual',title:'Nano-Glo HiBiT Extracellular Detection System · TM523',org:'Promega · 技术手册',url:'https://www.promega.com/resources/protocols/technical-manuals/500/nano-glo-hibit-extracellular-detection-system-protocol/',supports:'官方手册摘要：胞外可接近 HiBiT 与 LgBiT 互补检测表面或分泌蛋白；不能单独确认内体定位、回收或降解路线。'},
  {id:'apj-glucose-product',title:'Glucose Uptake-Glo Assay',org:'Promega · 官方产品页',url:'https://www.promega.com/products/energy-metabolism/metabolite-detection-assays/glucose-uptake_glo-assay/?catNum=J1341',supports:'已读官方产品与 TM467：J1341/J1342/J1343；基于 2DG6P 的细胞葡萄糖摄取发光检测。不是 APJ 专用模型，不覆盖全部肌肉与内皮功能。'},
  {id:'apj-glucose-manual',title:'Glucose Uptake-Glo Assay · TM467',org:'Promega · 技术手册',url:'https://www.promega.com/resources/protocols/technical-manuals/101/glucose-uptake-glo-assay-protocol/',supports:'官方方法摘要与产品目录号：哺乳动物细胞摄取 2DG 后的 2DG6P 检测；须独立建立 APJ 依赖的细胞模型与活率对照。'}
];
for (const s of sources) {
  const index = t.sources.findIndex(x => x.id === s.id);
  const record = {...s, checkedOn:date};
  if (index < 0) t.sources.push(record); else t.sources[index] = record;
}
const common = {origin:'厂商官方资料',status:'官方来源已核对；项目适配与供货需确认',relatedRefs:[]};
t.products = [
  {...common,id:'apj-pathhunter',vendor:'Eurofins DiscoverX',name:'PathHunter CHO-K1 AGTRL1 Bioassay Kit',sku:'当前规格及货号待厂商确认',kind:'细胞功能检测',format:'即用型 β-arrestin 招募检测',model:'CHO-K1 / AGTRL1-PK；β-arrestin-2-EA；序列与物种以实际构建说明为准',readout:'EFC 化学发光 · β-arrestin-2 招募',task:'受体调控与配体信号谱',boundary:'招募读数不能直接证明内吞、脱敏或降解；信号偏向需配套并验证 cAMP 等读数。当前仅核读官方产品索引，批次配置与完整手册需厂商确认。',ref:'apj-product'},
  {...common,id:'apj-radioligand',vendor:'Eurofins Discovery · LeadHunter',name:'APJ Human Apelin GPCR Binding Agonist Radioligand Assay',sku:'服务编号 2154',kind:'平台/服务',format:'委托检测服务',model:'人重组 APJ / APLNR',readout:'放射性配体竞争结合 · 闪烁检测',task:'配体识别与结合竞争',boundary:'为委托服务，不是可购买的细胞试剂盒；结合读数不证明激动作用、活细胞占有或受体敲除依赖性。',ref:'apj-binding-product'},
  {...common,id:'apj-camp-hunter',vendor:'Eurofins DiscoverX',name:'cAMP Hunter eXpress AGTRL1 CHO-K1 GPCR Assay',sku:'当前规格及货号待厂商确认',kind:'细胞功能检测',format:'即用型 eXpress 研究筛选检测',model:'人野生型 AGTRL1 / CHO-K1；Gi/Go 偶联',readout:'细胞内 cAMP 下降 · EFC 化学发光',task:'Gi–cAMP 功能与浓度反应',boundary:'按官方说明，eXpress 格式用于体外研究，不用于批次放行；拮抗条件、阴性模型与参照配体需另行验证。与 β-arrestin 平台比较时须处理表达与时间差异。',ref:'apj-camp-product'},
  {...common,id:'apj-hibit-surface',vendor:'Promega',name:'Nano-Glo HiBiT Extracellular Detection System',sku:'N2420 / N2421 / N2422',kind:'细胞功能检测',format:'通用 HiBiT 胞外检测组分',model:'自行建立并验证胞外 HiBiT 标记的 APJ 细胞模型',readout:'胞外可接近的 HiBiT 表面蛋白量 · 发光',task:'表面表达校准与运输读数补充',boundary:'只提供通用检测体系；APJ 标签可能影响结合、表达或内吞，需验证。表面量变化不能单独区分内吞、回收、降解或细胞状态变化。',ref:'apj-hibit-product',relatedRefs:['apj-hibit-manual']},
  {...common,id:'apj-glucose-uptake',vendor:'Promega',name:'Glucose Uptake-Glo Assay',sku:'J1341 / J1342 / J1343',kind:'细胞功能检测',format:'通用细胞葡萄糖摄取检测',model:'项目自建并确认 APLNR 依赖性的肌细胞等模型',readout:'2DG6P 相关发光 · 葡萄糖摄取',task:'肌肉代谢功能补充验证',boundary:'不含 APJ 专用细胞模型；需受体依赖性、细胞量及活率对照。仅覆盖糖摄取，不能替代肌力、肌肉再生或内皮整体功能评价。',ref:'apj-glucose-product',relatedRefs:['apj-glucose-manual']}
];
const links = [
  {id:'binding',resourceLinks:[{productId:'apj-radioligand',fit:'partial',use:'覆盖本方法中的 APJ 配体竞争结合部分。',needs:'委托样本与参照配体；活细胞占有、表面表达与受体阴性对照需另配。',limit:'服务标题中的 Agonist 不代表结合 assay 本身可判定激动或拮抗功能。'}],methodRefs:['apj-binding-product'],resourceGap:'活细胞占有及敲除／空载体对照尚未关联完整商品化配置。'},
  {id:'gi-camp',resourceLinks:[{productId:'apj-camp-hunter',fit:'direct',use:'测定人 AGTRL1 激活后的 cAMP 下降，支持 Gi 功能浓度反应。',needs:'候选物、参照配体、forskolin 条件与阴性对照；拮抗模式需独立验证。',limit:'eXpress 研究格式不用于批次放行；不能用本读数代替直接结合。'}],methodRefs:['apj-camp-product'],resourceGap:''},
  {id:'selectivity',resourceLinks:[{productId:'apj-camp-hunter',fit:'partial',use:'作为人 APJ 端功能读数，与同背景阴性及其他构建比较。',needs:'物种构建、阴性细胞、相邻受体和表面表达校准；匹配检测时间。',limit:'单一人受体产品不能构成跨物种或多受体选择性面板。'},{productId:'apj-hibit-surface',fit:'partial',use:'为经验证的 HiBiT-APJ 构建提供细胞表面量校准。',needs:'标签位置、表达与配体响应的独立验证。',limit:'HiBiT 是通用表面量检测，不能直接测配体亲和力。'}],methodRefs:['apj-hibit-manual'],resourceGap:'其他物种和相邻受体的匹配面板仍需按项目补齐。'},
  {id:'arrestin-bias',resourceLinks:[{productId:'apj-pathhunter',fit:'direct',use:'覆盖本方法中的 β-arrestin-2 招募读数。',needs:'参照激动剂与匹配的 cAMP 读数；偏向分析需统一参照、时间与模型。',limit:'该产品不自动覆盖 β-arrestin1，也不单独证明配体信号偏向。'},{productId:'apj-camp-hunter',fit:'partial',use:'提供与 β-arrestin 招募互补的 Gi–cAMP 读数。',needs:'同批候选物、参照配体及跨平台比较模型。',limit:'两平台 EC50 简单相除不能作为信号偏向结论。'}],methodRefs:['apj-bio-20261030-11'],resourceGap:'β-arrestin1 对照与匹配构建需另行核对。'},
  {id:'trafficking',resourceLinks:[{productId:'apj-hibit-surface',fit:'partial',use:'跟踪经验证 HiBiT-APJ 模型中的表面可接近受体量。',needs:'APJ 标记细胞、成像／内体定位、总蛋白量及再次刺激功能读数。',limit:'表面量检测须与定位证据结合；不能单独判定回收或降解。'}],methodRefs:['apj-hibit-manual','apj-bio-20261030-12','apj-traffic'],resourceGap:'尚未关联可直接覆盖 APJ 内体定位、回收及降解的完整商业体系。'},
  {id:'tissue-function',resourceLinks:[{productId:'apj-glucose-uptake',fit:'partial',use:'覆盖肌细胞模型中的葡萄糖摄取终点。',needs:'适用的肌细胞、受体依赖性与活率对照、参照配体；内皮模型另建。',limit:'通用检测组分的产品验证不等于 APJ 专用体系验证。'}],methodRefs:['apj-glucose-manual','apj-bio-20261030-16','apj-bio-20261030-17'],resourceGap:'内皮功能、肌力和再生终点尚未关联完整产品配置。'}
];
links.forEach((link,i) => Object.assign(t.assays[i],link));
t.methodResourcePilot = {date,version:2};
t.resourceKinds = ['细胞功能检测','平台/服务'];
t.resourceReview = {date,status:'方法内产品关联',note:'六项方法已关联五项产品／服务；区分对应读数与需配套验证，技术手册和文献集中列于第四部分。'};
t.gaps = '六项评价方法分别列出已核对的产品／服务及配套边界。通用组分需要自建并验证 APJ 模型；未确认的货号、物种构建、内皮功能和运输定位配置按各方法说明补齐。未穷尽供应商与管线。';
const pd1 = db.targets.find(t => t.id === 'pd1');
pd1.gaps = pd1.gaps.replace('本页示范实验方法与产品双向关联。','本页按实验方法关联产品与技术资料。');
fs.writeFileSync(file,'globalThis.TARGET_ATLAS_DATA='+JSON.stringify(db)+';\n');
console.log('APJ: 6 methods, 5 products/services, 8 links; APJ and PD-1 use literature-only fourth sections.');
