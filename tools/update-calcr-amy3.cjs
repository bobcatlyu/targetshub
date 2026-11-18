const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'assets/data.js');
const c = {};
vm.runInNewContext(fs.readFileSync(file, 'utf8'), c);
const t = c.TARGET_ATLAS_DATA.targets.find(t => t.id === 'calcr-amy3');
const date = '2026-11-13';
const image = fs.readFileSync(path.join(root, 'assets/images/calcr-amy3-mechanism-map-v1.png'));
t.biologyMap.image = {
  src:'assets/images/calcr-amy3-mechanism-map-v1.png',width:image.readUInt32BE(16),height:image.readUInt32BE(20),
  alt:'CALCR / AMY3 中文机制图：CALCR 核心与 CALCR＋单跨膜 RAMP3 复合物的区别，共同的 Gs–腺苷酸环化酶–cAMP 入口，AMY1/2/3 配对和 AM2 命名对照，以及骨钙、进食与餐后功能的归因边界。',
  caption:'原创机制示意 · 实线箭头表示作用方向；虚线框中的其他信号输出依赖细胞与配体背景。CALCRL–RAMP3 为 AM2；组织功能与药物效应不能自动归为 AMY3 专属作用。图示不表示定量强弱或完整分子网络。'
};
t.biologyReading = {
  groups:[
    {id:'molecular',level:'分子层面',title:'先确认受体核心、辅助蛋白与配体',question:'CALCR、AMY3 和 AM2 的命名，分别对应什么分子组合？',topics:[0,1,2],visual:'calcr-assembly',visualTitle:'同一 CALCR 核心，三种 RAMP 配对',refs:['calcr-amy3-assembly','calcr-amy3-ramp','calcr-amy3-splicing-primary','calcr-amy3-isoform-function'],note:'组合名称表示受体身份；共表达并不保证每个核心都已与 RAMP 完成组装。'},
    {id:'cellular',level:'细胞层面',title:'再看信号如何启动与持续',question:'共享 Gs–cAMP 入口，为什么仍会出现不同的效力与时程？',topics:[3,4,5],visual:'calcr-signals',visualTitle:'共享信号入口，保留构建与时间差异',refs:['calcr-amy3-ctr-signaling','calcr-amy3-amy-signaling','calcr-amy3-gq','calcr-amy3-trafficking'],note:'其他通路、运输及持续信号需按具体配体、剪接体和细胞模型解读。'},
    {id:'organs',level:'器官层面',title:'把受体机制放回骨钙与进食调节',question:'哪些证据支持 CALCR 轴，哪些证据描述整个胰淀素系统？',topics:[6,7],visual:'calcr-organs',visualTitle:'两个功能场景，分别理解受体归属',refs:['calcr-amy3-bone-calcium','calcr-amy3-bone-coupling','calcr-amy3-hindbrain','calcr-amy3-drug-biology-20261030'],note:'并列展示功能场景；动物回路、组织机制和人体药效回答不同层次的问题。'},
    {id:'attribution',level:'回到作用归因',title:'将受体谱、暴露与整体结果逐层连接',question:'一条 AMY3 功能曲线，能解释多少整体代谢作用？',topics:[8],visual:'calcr-attribution',visualTitle:'受体相对选择性与整体药效分开判断',refs:['calcr-amy3-cagri-biology-20261030','calcr-amy3-bio-biology-20261030','calcr-amy3-direct'],note:'结构与重组药理说明可实现的作用方式，人体效应仍需独立证据。'}
  ],
  topics:[
    {key:'AMY3 是 CALCR 与 RAMP3 形成的复合物；CALCRL 与 RAMP3 形成的 AM2 使用另一受体核心。',evidence:[['受体重构研究','CALCR 与 RAMP 配对改变胰淀素受体药理表型。']]},
    {key:'CALCR 剪接体与 RAMP 组装比例会影响实际受体群，结合相近也可能产生不同功能。',evidence:[['人基因与重组细胞','CT(a)/CT(b) 的 16 aa 插入与功能、内化差异。'],['亚基相互作用研究','共表达量与完成组装的膜上受体比例需要区分。']]},
    {key:'降钙素和胰淀素来源与功能不同；鲑降钙素的强效不能证明 AMY3 选择性。',evidence:[['人组织定位','甲状腺 C 细胞分泌降钙素。'],['受体药理与人体药效','胰淀素系统效应不能直接归因单一 AMY 亚型。']]},
    {key:'CALCR 提供共同激活核心，RAMP 与肽构象共同调整配体识别和信号传递。',evidence:[['冷冻电镜与突变研究','稳定的活化复合物结构支持结合和激活机制。']]},
    {key:'Gs–cAMP 是主要功能入口；Gq、钙与 ERK 等输出需要结合具体细胞背景理解。',evidence:[['重组细胞','CALCR 与 AMY3 的胞外环对 cAMP / ERK 贡献不同。'],['G 蛋白重构','外加 Gα15/16 等放大的钙信号不等于原生 AMY3 主通路。']]},
    {key:'配体停留、内化和可再响应受体的恢复，共同决定信号时程。',evidence:[['异源 CT(a) 模型','鲑降钙素与人降钙素的持续信号不同；不能照搬到所有 AMYR。']]},
    {key:'CALCR 轴参与破骨细胞活动和骨重塑；这类骨钙机制不能自动归为 AMY3 专属功能。',evidence:[['基因缺失小鼠','区分基础血钙稳态、应激与骨重塑中的细胞间耦联。']]},
    {key:'胰淀素系统连接进食、胃排空与餐后调节；回路证据与人体药效需要分别解读。',evidence:[['小鼠局部 Calcr 删除','支持最后区等后脑区域含 CALCR 受体参与。'],['人体药效／监管标签','普兰林肽的整体效应不构成 AMY3 亚型特异证据。']]},
    {key:'跨受体激动剂的整体作用取决于受体谱和暴露，AMYR 相对选择性仍不等于 AMY3 特异性。',evidence:[['结构与近端 Gs 招募','Cagrilintide 等肽在 CALCR 与多个 AMYR 的行为需要并行比较。']]}
  ]
};
const sourceRecords=[
  {id:'calcr-amy3-platform',title:'HTRF cAMP Gs Dynamic Detection Kit',org:'Revvity · 官方产品页',url:'https://www.revvity.com/product/htrf-camp-gs-dynamic-kit-20k-pts-62am4pec',supports:'已读产品页：62AM4PEB/62AM4PEC，细胞 cAMP 的竞争型 HTRF 检测。试剂本身不含 CALCR/AMY3 细胞模型，不把厂商其他受体验证移植为 AMY3 专用验证。'},
  {id:'calcr-amy3-dx-family',title:'AMY/CALCR cAMP、β-Arrestin 与 Membrane Preparations 产品系列',org:'Eurofins DiscoverX · 官方产品系列说明',url:'https://emea.discoverx.com/therapeutic_areas/amy-obesity',supports:'已读官方系列说明：稳定细胞、eXpress、膜制备，覆盖 cAMP 和 β-arrestin；单个 AMY3 膜制备构建、剪接体、物种、货号与供货尚需确认。历史 493-1210C2 页面返回 ITEM DOES NOT EXIST，未用作现售货号。'},
  {id:'calcr-amy3-arrestin-service',title:'AMY3 (CT/RAMP3) Human Antagonist Arrestin LeadHunter Assay · 86-0001P-2116AN',org:'Eurofins Discovery · 官方服务目录',url:'https://apac.eurofinsdiscovery.com/catalog/amy3-ct-ramp3-human-calcitonin-gpcr-cell-based-antagonist-arrestin-leadhunter-assay-us/86-0001P-2116AN',supports:'官方索引可读：人 CALCR/RAMP3、CHO-K1、β-arrestin-2、拮抗服务模式及人降钙素参照。是委托检测而非细胞试剂盒；未据此确认激动服务、β-arrestin1 或完整偏向评价。'},
  {id:'calcr-amy3-hibit-product',title:'Nano-Glo HiBiT Extracellular Detection System',org:'Promega · 官方产品页',url:'https://www.promega.com/products/protein-detection/protein-quantification/nano-glo-hibit-extracellular-detection-system/',supports:'N2420/N2421/N2422；通用胞外可接近 HiBiT 标签蛋白检测。受体和 RAMP 的标签构建、功能与归因均需项目验证，不直接证明复合物组装或内体定位。'},
  {id:'calcr-amy3-hibit-manual',title:'Nano-Glo HiBiT Extracellular Detection System · TM523',org:'Promega · 技术手册',url:'https://www.promega.com/resources/protocols/technical-manuals/500/nano-glo-hibit-extracellular-detection-system-protocol/',supports:'通用表面量检测原理与配套；不含 CALCR/RAMP3 稳定细胞或复合物专用配置。'},
  {id:'calcr-amy3-glosensor',title:'GloSensor cAMP：22F Plasmid 与 cAMP Reagent',org:'Promega · 官方产品页',url:'https://www.promega.com/products/cell-signaling/gpcr-signaling/glosensor-camp-cgmp-protease-biosensors/?catNum=E2301',supports:'官方目录列 E2301 22F cAMP plasmid、E1290/E1291 底物试剂；非裂解活细胞 cAMP 传感可用于动力学，需自行建立受体模型。无 AMY3 专属验证或复合物近接读数。'},
  {id:'calcr-amy3-glosensor-protocol',title:'GloSensor cAMP Assay Quick Protocol · FB113',org:'Promega · 官方方法资料',url:'https://www.promega.com/-/media/files/resources/protcards/glosensor-camp-assay-quick-protocol.pdf',supports:'官方方法说明非裂解活细胞 cAMP 传感、动力学或终点读数；持续 cAMP 不能单独判定信号来自膜面还是内体。'}
];
for(const source of sourceRecords){const i=t.sources.findIndex(s=>s.id===source.id);const record={...source,checkedOn:date};if(i<0)t.sources.push(record);else t.sources[i]=record;}
const common={origin:'厂商官方资料',status:'已核对所列来源；配置与项目适配需确认',relatedRefs:[]};
t.products=[
  {...common,id:'calcr-amy3-htrf-camp',vendor:'Revvity / HTRF',name:'HTRF cAMP Gs Dynamic Detection Kit',sku:'62AM4PEB / 62AM4PEC',kind:'平台/服务',format:'通用 cAMP 检测试剂',model:'需自行建立并验证 CALCR 与 CALCR＋RAMP3 配对细胞',readout:'细胞 cAMP · 竞争型 HTRF',task:'Gs–cAMP 功能与构建谱比较',boundary:'试剂不含受体细胞。需要校准受体/RAMP 表达、信号窗口与干扰；HTRF 原始比值与 cAMP 为竞争关系，应使用标准曲线。',ref:'calcr-amy3-platform'},
  {...common,id:'calcr-amy3-membranes',vendor:'Eurofins DiscoverX',name:'AMY/CALCR Membrane Preparations 产品系列',sku:'AMY3 构建、规格及货号待厂商确认',kind:'检测材料',format:'重组受体膜制备产品系列',model:'所需 CALCR 剪接体、RAMP3 组合及物种逐项确认',readout:'配套建立配体结合／竞争检测',task:'配体识别的受体材料选型',boundary:'本轮确认产品系列与用途，未确认单个 AMY3 膜制备现售构建。需另配标记配体和检测体系；膜结合不等于活细胞占有或受体依赖性。',ref:'calcr-amy3-dx-family'},
  {...common,id:'calcr-amy3-arrestin',vendor:'Eurofins Discovery · LeadHunter',name:'AMY3 (CT/RAMP3) Human Antagonist Arrestin Assay',sku:'服务编号 86-0001P-2116AN',kind:'平台/服务',format:'委托细胞功能检测',model:'人 CALCR/RAMP3 · CHO-K1 · β-arrestin-2',readout:'β-arrestin-2 招募相关 EFC 发光 · 拮抗模式',task:'AMY3 受体调控的拮抗评价',boundary:'现核对的是拮抗服务，不是细胞试剂盒；激动模式、核心剪接体及匹配 cAMP 读数需另核对。单项服务不能覆盖完整偏向性或受体内化。',ref:'calcr-amy3-arrestin-service'},
  {...common,id:'calcr-amy3-hibit',vendor:'Promega',name:'Nano-Glo HiBiT Extracellular Detection System',sku:'N2420 / N2421 / N2422',kind:'平台/服务',format:'通用 HiBiT 胞外检测组分',model:'自建胞外 HiBiT 标记 CALCR 或 RAMP3 模型；分别校验标签功能',readout:'胞外可接近标签的表面量 · 发光',task:'膜定位、表面量与运输读数补充',boundary:'表面量不能单独证明 CALCR/RAMP3 组装、内体定位、回收或降解；需定位、总量及功能对照。',ref:'calcr-amy3-hibit-product',relatedRefs:['calcr-amy3-hibit-manual']},
  {...common,id:'calcr-amy3-glosensor',vendor:'Promega',name:'GloSensor 22F cAMP Plasmid ＋ cAMP Reagent',sku:'E2301；另配 E1290 / E1291',kind:'平台/服务',format:'活细胞 cAMP 传感组件',model:'自建 CALCR／RAMP3 可控表达与 GloSensor 传感细胞',readout:'非裂解活细胞 cAMP 时程 · 发光',task:'配体持续作用、洗脱后反应与构建比较',boundary:'不含受体模型；传感器、受体表达与参照需验证。持续读数不能单独定位内体信号或证明 AMY3 复合物形成。',ref:'calcr-amy3-glosensor',relatedRefs:['calcr-amy3-glosensor-protocol']}
];
const mapping=[
  {id:'binding',resourceLinks:[{productId:'calcr-amy3-membranes',fit:'partial',use:'为 CALCR 与 AMY3 配体结合比较选择受体膜材料。',needs:'核对 AMY3 构建与剪接体，另配标记配体、标准品及检测；活细胞占有需其他模型。',limit:'产品系列已确认，具体 AMY3 膜制备构建与货号仍需确认。'},{productId:'calcr-amy3-hibit',fit:'partial',use:'辅助校准经验证标签模型的表面受体／RAMP 量。',needs:'受体依赖性及标签影响对照。',limit:'表面量检测不是配体结合检测。'}],methodRefs:['calcr-amy3-assembly'],resourceGap:'未将产品系列入口当作一份已完整核实的 AMY3 结合试剂盒。'},
  {id:'gs-camp',resourceLinks:[{productId:'calcr-amy3-htrf-camp',fit:'partial',use:'量化配对 CALCR 与 AMY3 模型中的 cAMP 累积。',needs:'验证受体细胞、参照配体、刺激窗口、标准曲线及阴性对照。',limit:'通用检测试剂不提供受体亚型选择性。'},{productId:'calcr-amy3-glosensor',fit:'partial',use:'用活细胞 cAMP 时程补充终点读数。',needs:'建立传感器和受体模型，验证温度、底物及时间依赖。',limit:'与终点免疫检测采用不同信号格式，原始值不能直接比较。'}],methodRefs:['calcr-amy3-direct'],resourceGap:''},
  {id:'selectivity',resourceLinks:[{productId:'calcr-amy3-htrf-camp',fit:'partial',use:'在统一检测格式中比较 CALCR 与不同 RAMP 组合。',needs:'CALCR(a/b)、RAMP1/2/3 和 CALCRL–RAMP 对照及表达校准。',limit:'不是预装的多受体选择性面板。'},{productId:'calcr-amy3-hibit',fit:'partial',use:'为验证过的标签构建补充膜表面量校准。',needs:'各构建的标签位置和配体响应验证。',limit:'共表达或表面量一致不代表组装比例相同。'}],methodRefs:['calcr-amy3-subunits','calcr-amy3-direct'],resourceGap:'具体构建、物种和近缘受体面板按项目补齐。'},
  {id:'arrestin-bias',resourceLinks:[{productId:'calcr-amy3-arrestin',fit:'partial',use:'覆盖人 AMY3 的 β-arrestin-2 招募相关拮抗评价。',needs:'确认拮抗服务模式、参照条件；激动、β-arrestin1 与匹配 cAMP 配置另配。',limit:'不能由单条拮抗曲线判断信号偏向，也不能把招募等同内吞。'}],methodRefs:['calcr-amy3-trafficking'],resourceGap:'激动招募模式与同背景多通路偏向评价仍需核对或建立。'},
  {id:'trafficking',resourceLinks:[{productId:'calcr-amy3-hibit',fit:'partial',use:'跟踪经验证 CALCR／RAMP3 标签构建的表面可接近量。',needs:'内体定位、总蛋白量、配体洗脱和再次刺激对照。',limit:'不能单独区分内化、回收、降解或细胞状态变化。'},{productId:'calcr-amy3-glosensor',fit:'partial',use:'观察相同构建下的持续 cAMP 与再次刺激功能。',needs:'与表面量及定位读数配对。',limit:'不直接定位信号发生区室。'}],methodRefs:['calcr-amy3-hibit-manual','calcr-amy3-trafficking'],resourceGap:'AMY3 特异内体定位和回收路径未确认完整商业配置。'},
  {id:'assembly-duration',resourceLinks:[{productId:'calcr-amy3-glosensor',fit:'partial',use:'覆盖可控受体／RAMP 背景的持续 cAMP 功能部分。',needs:'另配复合物近接、组装与表面量证据。',limit:'通用 cAMP 时程不能单独证明 AMY3 组装或人体代谢作用。'},{productId:'calcr-amy3-hibit',fit:'partial',use:'补充对应表达模型的表面量对照。',needs:'独立验证复合物形成及标签影响。',limit:'不能把表面共表达等同受体复合物组装。'}],methodRefs:['calcr-amy3-glosensor-protocol','calcr-amy3-subunits','calcr-amy3-direct'],resourceGap:'复合物近接／直接 Gs 招募目前关联原始研究，未列作已验证商品化 AMY3 完整体系。'}
];
mapping.forEach((record,i)=>Object.assign(t.assays[i],record));
t.methodResourcePilot={date,version:2};
t.biologyBridge='从受体身份、配体谱与信号时程出发，在匹配构建中比较结合、cAMP、β-arrestin 和运输；每种读数的产品配套及归因边界见下方。';
t.resourcesMode='literature';
t.resourceKinds=['平台/服务','检测材料'];
t.resourceReview={date,status:'方法内产品关联',note:'六项方法对应五项产品／服务或材料系列；具体配套与未确认构建在方法内说明。'};
t.gaps='CALCR 核心、AMY3 复合物和 AM2 分别解释。六项方法中列出已核对的平台、材料系列及委托服务；通用组分需要自建并验证模型。AMY3 特定膜制备货号、激动招募与复合物定位配置尚需确认，未穷尽供应商与方法。';
fs.writeFileSync(file,'globalThis.TARGET_ATLAS_DATA='+JSON.stringify(c.TARGET_ATLAS_DATA)+';\n');
console.log('Updated CALCR/AMY3 image, four biology groups, nine summaries and six method-product mappings.');
