const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'assets/data.js');
const context = {};
vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), context);
const db = context.TARGET_ATLAS_DATA;
const apj = db.targets.find(t => t.id === 'apj');
apj.biologyReading = {
  groups: [
    {id:'molecular',level:'分子层面',title:'先认识受体和两类配体',question:'谁在激活 APJ？信号从哪里来？',topics:[0,1,2],visual:'apj-inputs',refs:[3,4,5,6,7,8]},
    {id:'cellular',level:'细胞层面',title:'再看信号如何启动与调整',question:'一次受体激活，如何变成随时间变化的细胞反应？',topics:[3,4],visual:'apj-signaling',refs:[9,10,11,12]},
    {id:'organs',level:'器官层面',title:'把细胞机制放回组织中',question:'同一个系统，如何参与循环、水分与能量调节？',topics:[5,6,7],visual:'apj-organs',refs:[6,13,14,15,16,17]},
    {id:'stimuli',level:'回到刺激方式',title:'同一受体，也能感受不同输入',question:'为什么肽配体激活和机械牵张会产生不同输出？',topics:[8],visual:'apj-stimuli',refs:[18]}
  ],
  topics: [
    {key:'APJ 把胞外肽信号接入细胞；表达在哪类细胞，会影响它产生的功能。',evidence:[['人组织定位','心肌、内皮和血管平滑肌中检出受体样免疫反应。']]},
    {key:'Apelin 包含多种加工形式；判断活性时，需要知道真正到达受体的是哪一种肽。',evidence:[['体外加工研究','PCSK3 可直接将 proapelin 加工为 apelin-13。'],['人组织分析','冠心病心脏样本中以 [Pyr¹]apelin-13 为主。']]},
    {key:'ELA 来自独立的 APELA 基因，为 APJ 提供另一类内源性配体输入。',evidence:[['斑马鱼遗传研究','支持 ELA–受体系统参与早期心脏发育。'],['重组细胞','哺乳动物细胞实验支持 ELA 激活 APJ。']]},
    {key:'Gi/o 是经典信号入口；不同配体、受体伙伴和细胞背景会改变各分支的相对输出。',evidence:[['重组细胞','CHO / HEK293 等系统支持偶联与配体信号差异。'],['共表达模型','APJ–NTSR1 异聚模型支持特定 Gq–ERK 输出。']]},
    {key:'受体进入细胞内部，与信号逐渐减弱，是可以分离的过程。',evidence:[['重组细胞','HA 标记鼠 APJ / HEK293 模型；该模型内吞不要求 β-arrestin1。']]},
    {key:'循环净效应来自心肌、内皮和平滑肌的共同作用，并随组织状态变化。',evidence:[['人体急性研究','支持短时心输出量及血管阻力变化。'],['离体人组织','支持内皮状态不同的血管反应差异。']]},
    {key:'Apelin–APJ 的水分调节嵌入 AVP 神经内分泌回路，需要结合水合状态理解。',evidence:[['啮齿动物中枢干预','支持 AVP 神经元活动、释放与排水调节。'],['基因缺失小鼠','显示整体水分调节涉及多部位作用与代偿。']]},
    {key:'Apelin 连接肌肉收缩、糖利用与肌肉适应；干预获益主要来自动物研究。',evidence:[['动物干预','支持糖利用及老龄小鼠肌肉功能改善。'],['人体观察','支持收缩诱导和年龄相关变化；长期治疗获益仍需独立证据。']]},
    {key:'在特定心肌模型中，肽配体和机械牵张使 APJ 偏向不同信号输出。',evidence:[['心肌细胞与小鼠','机械牵张及慢性压力负荷模型；受体缺失与配体缺失结果不同。']]}
  ]
};
fs.writeFileSync(dataPath, 'globalThis.TARGET_ATLAS_DATA=' + JSON.stringify(db) + ';\n');
console.log('Added APJ reading groups, key messages and evidence labels.');
