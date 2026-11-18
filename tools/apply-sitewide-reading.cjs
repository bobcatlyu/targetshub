/* Organize existing, source-backed content; no new mechanisms or supplier claims. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'assets/data.js');
const c = {};
vm.createContext(c);
vm.runInContext(fs.readFileSync(file, 'utf8'), c);
const db = c.TARGET_ATLAS_DATA;
const date = '2026-11-18';
// One-based method and product numbers, individually matched to the recorded readout.
// All these associations are partial: the method generally asks a broader question.
const map = {};
function link(ids, method, product = 1, use, needs) {
  for (const id of ids.split(' ')) (map[id] ||= []).push({method, product, use, needs});
}
link('c5ar1 sstr5 drd2 sstr2', 2, 1, '通用平台的 cAMP 配置选型入口。', '先向厂商确认本靶点构建、宿主、检测模式与靶点验证数据；不能从平台总览推定已有现成产品。');
link('gpr75', 3, 1, '为正交 G 蛋白功能检测选择技术平台。', '核实 GPR75 构建、耦联背景与参考条件；候选配体需独立完成受体依赖性验证。');
link('crhr', 2, 1, '检测已建立受体模型中的 cAMP。', '另配 CRHR1/CRHR2 细胞、参照配体、标准曲线和近缘受体对照。');
link('crhr', 3, 2, '提供 CRHR1 的 CRE 转录报告模型，辅助选择性比较。', '需另配 CRHR2 与匹配功能读数；CRE 是下游转录输出，不能当作直接 cAMP 定量或完整亚型面板。');
link('fcrn', 3, 1, '在内皮细胞模型中评价 FcRn 相关 IgG 回收。', '另配 IgG、上清定量检测及受体依赖性对照；细胞回收不直接等于体内半衰期。');
link('fcrn', 2, 2, '评价 HSA–FcRn 蛋白相互作用的抑制。', '此配置针对 HSA；IgG 竞争、pH 梯度和细胞回收需分别配套，不能用 HSA 读数代替 IgG。');
link('il13 il10 il4ra il17 il2 il5 il6 rankl baff', 2, 1, '覆盖所列工程模型中的受体下游报告信号。', '另配候选物、参照、细胞状态与受体依赖性对照；原代功能、组织效应与近缘通路选择性需独立验证。');
link('il12-il23', 2, 1, '覆盖 IL-23 下游报告功能部分。', '另配 IL-12/STAT4 模型及选择性对照；不能将 IL-23 报告读数推及 IL-12。');
link('il15', 2, 1, '提供 IL-2/IL-15 工程报告模型的技术资料。', '确认具体细胞和试剂配置；IL-15Rα 反式呈递、原代 NK/T 细胞功能需另建模型。');
link('il1', 2, 1, '覆盖成熟 IL-1β 诱导的工程报告信号。', 'IL-1α、前体加工与炎症小体过程需另配模型；本报告体系不直接测量这些过程。');
link('cd47-sirpa', 2, 1, '覆盖 CD47/SIRPα 阻断相关的工程报告输出。', '按技术手册配齐体系，并另做巨噬细胞真实吞噬及 Fc 贡献对照；报告信号不是吞噬率。');
link('tie2', 2, 1, '提供 Tie2 生化激酶活性读数。', '另配细胞内 p-Tie2、下游信号与受体聚集模型；酶活体系不包含完整膜受体环境。');
link('trop2 b7h3 cd22 cd30 cd79b folr1 msln muc1 nectin4 tf gprc5d dll3 psma', 1, 1, '提供所列抗原表达细胞，用于活细胞结合评价。', '另配候选物、检测抗体、阴性细胞及表达量校准；结合不能直接代表内吞、递送或杀伤。');
link('cd19 cd20', 3, 1, '以标记靶细胞的死亡读数补充 T 细胞重定向杀伤评价。', '另配效应 T 细胞、候选双抗、相应检测组分和效靶比/背景死亡对照；死亡读数不等同 T 细胞活化。');
link('cd19 cd20', 3, 2, '用抗原敲除靶细胞对照检验杀伤的抗原依赖性。', '与匹配的抗原阳性靶细胞和效应细胞并行；单一敲除对照不能穷尽脱靶和长期安全性。');
link('cd38 cldn182 ccr4 gd2 slamf7', 2, 1, '提供 FcγR 介导的 ADCC 报告信号技术配置。', '另配目标抗原阳性/阴性细胞、候选抗体与参照；需用真实效应细胞及靶细胞死亡检测补充杀伤结论。');
link('egfr', 2, 1, '覆盖所列 EGFR 缺失突变构建的生化激酶抑制。', '另配细胞磷酸化与信号检测及其他变异/野生型构建；该酶构建不能代表全部 EGFR 背景。');
link('egfr', 1, 2, '提供人 EGFR 表达细胞用于细胞结合。', '另配候选物、标记检测和阴性对照；需独立评价信号阻断与抗增殖。');
link('her2', 5, 1, '覆盖 HER2 靶向模态中的受体内吞相关部分。', '另配候选物及受体表达对照；内吞不能直接说明溶酶体释放、ADC 杀伤或信号抑制。');
link('her2', 5, 2, '以 NCI-N87 靶细胞死亡读数评价抗体依赖的杀伤部分。', '另配候选抗体、效应细胞和相应检测组分；不能由此推定 ADC 递送或所有 HER2 模态的效应。');
link('tnf', 1, 1, '提供膜 TNFα 靶细胞，用于细胞结合与膜型抗原识别。', '另配候选物、检测和阴性细胞；需另外配置 TNFR 下游功能、ADCC 或 CDC 检测。');
link('cgrp', 3, 1, '用 CALCRL/RAMP1 的 β-arrestin 招募相关读数补充正交评价。', '另配或确认 cAMP 模型；招募不是直接 Gs–cAMP 读数，也不等于原代组织效应。');
link('gcgr gipr', 2, 1, '检测已建立受体模型中的 cAMP。', '另配经验证的受体细胞、参照配体、标准曲线和干扰对照；通用检测试剂不提供受体或亚型选择性。');
link('b7h4', 1, 1, '提供 B7-H4 表达密度系列细胞用于结合比较。', '另配候选物、表达校准和阴性细胞；密度系列不等同 ADC 内吞、递送或杀伤。');
link('b7h4', 5, 1, '在可控表达密度条件下比较候选物识别。', '另配真实肿瘤异质性模型与杀伤终点；工程密度梯度只覆盖异质性问题的一部分。');
link('b7h6 siglec7 siglec9 integrin-a4 sost', 1, 1, '提供所列重组蛋白材料，用于建立结合检测。', '另配结合伙伴、SPR/BLI/ELISA 等检测组件与标签/构象对照；蛋白材料不构成完整细胞功能试验。');
link('btla-hvem cd28 pdl2 integrin-a4b7 pcsk9 her3', 1, 1, '覆盖产品说明中列出的蛋白相互作用或竞争读数。', '核对产品所用结合伙伴、构建和检测格式；未包含的另一配体、膜环境、结合动力学及细胞功能需另配。');
link('cd137 cd27 cd40 gitr ctla4 icos lag3 ox40 pdl1 tigit', 2, 1, '覆盖所列配体/受体组合的工程报告功能。', '按厂商资料配齐配套细胞、候选物与参照；原代细胞、其他配体、Fc/聚集情境和真实效应终点需另行评价。');
link('cd3', 3, 1, '用 Jurkat NFAT 报告输出补充 T 细胞激活评价。', '另配候选物、抗原端靶细胞和参照；报告活化不能代替原代 T 细胞或真实靶细胞杀伤。');
link('lilrb1', 1, 1, '提供 LILRB1 重组蛋白，用于建立配体或候选物结合检测。', '另配其他 LILR 家族成员、配体及检测组件；单一蛋白不能形成家族选择性面板。');
link('lilrb2', 2, 1, '覆盖所列 HLA-G1 共培养背景下的工程报告响应。', '另配候选物与通路对照；报告抑制/恢复不等同直接结合动力学或原代髓系细胞重编程。');
link('lilrb4', 3, 1, '提供 LILRB4 工程报告模型，作为功能评价的补充入口。', '必须另配 AML–T 细胞共培养、受体依赖性及真实抑制终点；工程 NFAT 读数不直接代表 AML 介导的 T 细胞抑制。');
link('tim3', 1, 1, '提供已列抗 TIM-3 抗体作为识别/结合材料线索。', '核对抗体用途、检测格式和配体竞争条件；抗原识别验证不能自动证明阻断、激动或功能方向。');
link('tmigd2-hhla2', 2, 1, '提供 HHLA2/TCR 激活端的共培养辅助细胞。', '另配 TMIGD2 受体端细胞及匹配报告/原代读数、阴性对照；该细胞本身不是完整双受体功能体系。');
link('tmigd2-hhla2', 3, 1, '为 HHLA2–KIR3DL3 共培养配置提供配体端材料。', '另配 KIR3DL3 受体端模型与抑制读数；不能将同一配体端细胞直接视为已验证的抑制体系。');
link('vista', 7, 1, '覆盖 VSIG3–VISTA 蛋白结合的候选伙伴评价。', '另配 pH 梯度、PSGL-1 相关体系和细胞功能；VSIG3 结合结果不能确证生理伙伴身份或替代酸性情境验证。');
link('gdf15-gfral', 2, 1, '覆盖 GDF15 响应工程模型的下游 SRE 报告信号。', '确认 GFRAL/RET 配置，另配受体依赖性与近端信号检测；不能外推摄食、厌恶或体重效应。');
link('fixa-fx', 1, 1, '提供 F9 重组蛋白作为结合材料选型线索。', '须确认活化状态、构建与用途；F9 蛋白不能直接当作活性 FIXa，FXa 生成需另配完整反应体系。');
link('thrombin', 2, 1, '覆盖凝血酶底物酶活/抑制读数。', '另配凝血、抗凝药及逆转相关模型；底物酶活不能代表完整凝血过程或临床逆转效果。');
link('abeta', 1, 1, '用 Aβ42 ELISA 补充样品浓度定量。', '另配聚集状态、构象与样品质量检测；浓度读数不能区分全部聚集体或证明聚集质量。');
link('c5', 2, 1, '覆盖经典补体通路的终末 C5b-9 功能读数。', '另配其他补体途径、直接 C5 裂解或溶血检测；单一路径终点不等同全部 C5 功能。');
link('ige', 2, 1, '覆盖 IgE/FcεRI 相关工程 NFAT 报告功能。', '另配候选物、IgE/抗原条件、参照及原代细胞脱颗粒等正交终点。');
link('lpa', 3, 1, '定量样品中的 Lp(a)。', '验证样本基质、定量范围与异构体影响；检测组件本身不能证明递送、RNA 沉默或临床获益。');
link('ar', 2, 1, '覆盖 22Rv1 背景中的 AR 转录报告输出。', '另配直接结合、核转位、受体变异/剪接体与细胞状态对照；报告信号不等同受体占有。');
link('ikzf1-3', 2, 1, '用 HiBiT 标记丰度读数追踪 IKZF1/IKZF3 降解。', '另配内源蛋白、CRBN 依赖性和蛋白酶体对照；丰度下降需排除转录及细胞状态变化。');
link('actrii', 2, 1, '覆盖 Myostatin 条件下的工程报告活性。', '确认 Early Access 配置，另配其他配体和 ActRIIA/IIB 因果对照；单一配体体系不是完整配体矩阵。');
link('insr', 2, 1, '覆盖所列 InsR 生化激酶活性。', '另配 INSR-A/B 完整细胞模型和 p-INSR 检测；ADP 读数不能直接代表细胞受体磷酸化。');
link('met', 2, 1, '覆盖重组 c-Met 生化激酶活性。', '另配细胞 p-MET 与下游信号检测；ATP 消耗读数不等同完整细胞通路。');
link('calcium-channels', 2, 1, '提供自动膜片钳平台及所列 CaV1.2 应用资料。', '确认平台/服务配置、通道构建、细胞和电压程序；单一应用不构成全部通道亚型面板。');
link('tl1a', 2, 1, '覆盖 TL1A 诱导的工程报告功能。', '另配候选物、参照及 DR3 依赖性对照；原代共刺激、组织纤维化与 DcR3 情境需独立评价。');
link('tl1a', 1, 2, '覆盖 DR3–TL1A 蛋白结合/竞争读数。', '另配结合动力学、膜型配体、DcR3 对照和细胞功能。');
link('cd33', 2, 1, '覆盖 CD33 进入内体相关区室的内吞读数。', '另配候选物、表达校准、溶酶体定位与载荷释放检测；内体读数不能证明 ADC 完整递送。');
link('gp100', 1, 1, '提供所列 gp100/HLA-A*02:01/B2M pMHC 材料用于识别评价。', '另配候选物及其他肽/HLA 对照和检测组件；不能代表所有 HLA 或天然肿瘤呈递量。');
link('gp100', 2, 1, '为双端识别评价提供 gp100–pMHC 一端的材料。', '另配 CD3 端与双端桥接检测；单一 pMHC 蛋白不构成完整桥接或杀伤体系。');
link('btk', 1, 1, '覆盖 BTK 催化酶活抑制。', '另配共价结合/时间依赖动力学和细胞信号检测；ADP 终点不能直接证明共价机制。');
link('kras', 2, 1, '覆盖核苷酸交换相关的生化读数。', '核对所列 KRAS 构建与核苷酸条件，另配直接结合和细胞功能；交换信号不是直接结合量。');
link('top2', 2, 1, '覆盖 TOP2 对 kDNA 的去连环催化活性。', '另配切割复合物捕获、异构体与细胞 DNA 损伤；催化抑制不能直接认定毒化机制。');
link('wrn', 1, 1, '覆盖所列 WRN 解旋核心的 DNA 解旋活性。', '另配 ATPase、全长/外切核酸酶与细胞依赖性检测；该构建不代表 WRN 全部功能。');

function sentences(text) { return text.match(/[^。！？]+[。！？]?/g) || [text]; }
function caution(text) {
  return sentences(text).filter(s => /不能|不等于|不意味着|尚不|仍需|需.{0,12}验证|争议|不足以|不能据此/.test(s)).sort((a,b)=>a.length-b.length)[0];
}
for (const t of db.targets) {
  if (!t.biologyReading || t.biologyReading.layout==='sitewide-20261118' || (t.biologyReading.date===date&&!['apj','calcr-amy3'].includes(t.id))) {
    t.biologyReading = {
      date,layout:'sitewide-20261118',
      groups: [
        {id:'foundation',level:'靶点基础',title:'先认识靶点与作用基础',topics:[0,1,2]},
        {id:'function',level:'作用与调控',title:'再理解功能如何产生与调节',topics:[3,4,5]},
        {id:'context',level:'研究情境',title:'结合不同情境与证据理解',topics:[6,7,8]}
      ].map(g=>({...g,question:g.topics.map(i=>t.biology[i].shortTitle||t.biology[i].title.split('：')[0]).join(' · ')})),
      topics:t.biology.map(b=>{
        const text=(b.paragraphs||[{text:b.text}]).map(p=>p.text).join('');
        const ss=sentences(text);
        const boundary=caution(text);
        let key=ss[0];
        if(key.length<65 && ss[1] && key.length+ss[1].length<=160) key+=ss[1];
        const sources=b.refs.map(id=>t.sources.find(s=>s.id===id)).filter(Boolean);
        const cited=sources.slice(0,3);
        const evidence=cited.length?[['文献背景',[...new Set(cited.map(s=>s.org))].join('；'),cited.map(s=>s.id)]]:[];
        if(boundary && !key.includes(boundary)) evidence.push(['解读边界',boundary]);
        return {key,evidence};
      })
    };
  }
  if(t.biologyReading.layout==='sitewide-20261118') {
    const overrides={
      gpr75:{5:'20-HETE 被提出可通过 GPR75 连接血管相关信号；配体与耦联关系需结合具体模型理解。',6:'CCL5 与 GPR75 的关系存在争议，须排除 CCR1/3/5 等经典受体造成的信号。',7:'GPR75 的 Gi 基础活性、结构稳定与候选配体激活证据需分别解读，预印本结论仍待验证。',8:'成年小鼠中删除 Gpr75 提供干预潜力线索，但不能直接等同于成人药物减重效果。'},
      lag3:{7:'LAG-3 与 α-syn 纤维结合及神经传播的关系存在独立研究分歧，应作为争议分支理解。'}
    };
    for(const [i,key] of Object.entries(overrides[t.id]||{}))t.biologyReading.topics[Number(i)].key=key;
  }
  if (!t.methodResourcePilot) {
    t.products.forEach((p,i)=>{p.id ||= `${t.id}-resource-${String(i+1).padStart(2,'0')}`;});
    t.assays.forEach((a,i)=>{
      a.id ||= `evaluation-${String(i+1).padStart(2,'0')}`;
      a.resourceLinks=[];
      a.methodRefs=[];
      a.resourceGap='现有资料尚未关联覆盖本方法的完整产品配置；本方法所引依据见下方，具体材料与检测组件需另行匹配。';
    });
    if (t.id==='bcma') {
      t.assays.push({id:'internalization',group:'mechanism',title:'内吞与内体递送补充评价',tag:'内吞补充',question:'候选物是否诱导 BCMA 进入内体相关区室？',model:t.products[0].model,readout:t.products[0].readout,decision:'为内吞相关模态提供受体运输读数。',limit:'内吞不是 T 细胞桥接、活化或真实杀伤，也不能单独证明溶酶体释放与载荷效应。',evidence:'厂商方法资料',refs:[t.products[0].ref],resourceLinks:[],methodRefs:[],resourceGap:''});
      map.bcma=[{method:t.assays.length,product:1,use:'覆盖 BCMA 内吞相关读数，作为本页细胞桥接/杀伤之外的补充。',needs:'另配候选物、受体表达与背景对照；ADC 模态另需溶酶体、释放与杀伤检测。'}];
    }
    if(!map[t.id]) throw Error('No reviewed product mapping: '+t.id);
    for(const m of map[t.id]) {
      const a=t.assays[m.method-1],p=t.products[m.product-1];
      if(!a||!p) throw Error('Bad mapping '+t.id+': '+JSON.stringify(m));
      a.resourceLinks.push({productId:p.id,fit:'partial',use:m.use,needs:m.needs,limit:p.boundary});
      a.resourceGap='';
    }
    for(const p of t.products) if(!t.assays.some(a=>a.resourceLinks.some(l=>l.productId===p.id))) throw Error('Orphan product '+t.id+' '+p.name);
    t.methodResourcePilot={date,version:2};
  }
  t.resourcesMode='literature';
  t.inlineProductDetails=true;
  if(t.gaps)t.gaps=t.gaps.replace(/本节资源说明/g,'第三部分各方法内的产品说明');
}
fs.writeFileSync(file,'globalThis.TARGET_ATLAS_DATA='+JSON.stringify(db)+';\n');
console.log(`Organized ${db.targets.length} pages with method-product associations. No images generated.`);
