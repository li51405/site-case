/** 首页各区块文案：首屏、痛点对照、业务线、能力矩阵、交付流程、案例精选、CTA、控制台示意图 */

export const hero = {
  badge: '2026 物联网安全白皮书已发布',
  badgeAction: '阅读',
  titleLine1: '把系统宕机，',
  titleLine2: '变成一件可预防的事',
  /** 首屏简介按模板结构分段，highlight 部分在模板中加粗展示 */
  introLead: '廷宣科技为大型企业交付',
  introHighlight1: 'IT 系统安全运维托管',
  introJoin: '与',
  introHighlight2: '物联网设备安全接入',
  introTail: '。不讲参数堆砌，只对业务连续性负责。',
  primaryCta: '预约 45 分钟系统健康度评估',
  secondaryCta: '查看金牌案例',
  note: '无需现场部署即可完成评估 · 评估报告 3 个工作日内交付',
  trustTitle: '已为这些组织交付关键系统',
}

export const painShift = {
  heading: {
    eyebrow: 'Why it matters',
    title: '技术参数不解决焦虑，商业结果才会',
    desc: '企业级客户真正担心的，从来不是「有没有这个功能」，而是「出了问题谁负责、损失多少、多久能恢复」。所以我们把每一句技术描述，都翻译成一句能被审计的商业结果。',
  },
  beforeLabel: '常见的技术话术',
  afterLabel: '廷宣交付的商业结果',
  rows: [
    {
      before: '支持固件自动更新',
      after: '20 万台设备升级不停产，72 小时完成，失败率 0.03%',
    },
    {
      before: '提供 7×24 小时监控告警',
      after: '故障在您察觉之前已被处理，运维不再背「为什么没早发现」',
    },
    {
      before: '满足等保 2.0 三级要求',
      after: '不再因合规缺口错失关键项目投标，审计准备从 3 周缩到 2 天',
    },
    {
      before: '支持海量设备并发接入',
      after: '一套身份体系管完 20 万台设备，影子设备再也藏不住',
    },
    {
      before: '采用微服务架构重构',
      after: '改造期间业务零停机，边跑边换引擎，不做大爆炸式重构',
    },
  ],
  footnote: '以上数据来自 2021 – 2026 年真实交付项目，可在案例页逐项核对',
}

export const serviceSplit = {
  heading: {
    eyebrow: 'Two practices',
    title: '两条业务线，按你的角色分开走',
    desc: 'IT 负责人先关心「核心系统稳不稳」，设备与生产负责人先关心「终端可不可信」。两条线可独立交付，也可组合成一套完整底座。',
  },
  badgeFor: {
    software: '面向核心系统',
    iot: '面向设备与现场',
  },
  detailLink: '查看该业务线交付细节',
  comboTitle: '不确定该走哪条线？',
  comboDesc: '多数客户其实是组合场景：核心系统需要托管，同时现场有大量设备需要纳管。',
  comboCta: '让架构师帮你判断',
}

export const capabilityGrid = {
  heading: {
    eyebrow: 'Core capabilities',
    title: '六项能力，一个承诺',
    desc: '我们不做全品类外包，只把「关键系统不出事」这一件事做到可验证。',
  },
  moreLink: '查看完整服务矩阵',
  moreText: '了解详情',
  items: [
    {
      icon: 'layers' as const,
      title: '全生命周期保护',
      desc: '从设备出厂签发身份，到在网运行、固件升级，直至退役注销，每个阶段都有对应的安全动作，不留断点。',
      tag: 'Lifecycle',
      to: '/services#device-identity',
    },
    {
      icon: 'gauge' as const,
      title: '稳定性工程',
      desc: '不靠「人盯人」。用容量模型、变更管控与灾备演练，把偶发故障压缩成可预测的日常事件。',
      tag: 'Reliability',
      to: '/services#managed-ops',
    },
    {
      icon: 'lock' as const,
      title: '零信任身份',
      desc: '一机一证、双向认证、按需授权。共享密钥与默认放行，在企业网络里没有存在的理由。',
      tag: 'Zero Trust',
      to: '/services#device-identity',
    },
    {
      icon: 'network' as const,
      title: '边缘自治',
      desc: '云端失联时，边缘节点独立执行本地策略并缓冲数据。网络抖动不再等于业务停摆。',
      tag: 'Edge',
      to: '/services#edge-gateway',
    },
    {
      icon: 'doc' as const,
      title: '合规可审计',
      desc: '每一次访问、变更与升级全程留痕，等保与内审所需的证据链由系统自动生成。',
      tag: 'Compliance',
      to: '/services#compliance',
    },
    {
      icon: 'clock' as const,
      title: '7×24 应急响应',
      desc: '5 分钟内进入作战室，30 分钟内给出处置方案。值守不是热线，是一支随时能动手的团队。',
      tag: 'Response',
      to: '/contact',
    },
  ],
}

export const process = {
  heading: {
    eyebrow: 'How we deliver',
    title: '90 天内看到第一个可核对的数字',
    desc: '企业级项目最容易失控的地方，是「一直在推进，但说不清进展」。我们把交付拆成有窗口、有交付物、有回退点的四段。',
  },
  steps: [
    {
      window: 'D0 – D7',
      title: '系统健康度评估',
      desc: '不进场、不改配置。通过只读接入与访谈，输出一份包含资产清单、风险排序与停机成本测算的评估报告。',
      delivers: ['资产与依赖清单', '风险分级与修复优先级', '停机成本估算'],
    },
    {
      window: 'D7 – D30',
      title: '方案设计与试点',
      desc: '选定一个风险最高但影响面可控的场景做试点。用真实数据验证方案，而不是用 PPT 验证方案。',
      delivers: ['目标架构与迁移路径', '试点范围与回退方案', '验收指标定义'],
    },
    {
      window: 'D30 – D90',
      title: '分批交付',
      desc: '按业务影响度分批推进，每批都有明确的回退检查点。交付物包含自动化脚本与运行手册，不做黑盒。',
      delivers: ['分批实施计划', '自动化脚本与手册', '每批验收报告'],
    },
    {
      window: 'D90 起',
      title: '长期托管与复盘',
      desc: '进入托管值守，按季度输出运行报告与容量预测。合作结束时客户团队可独立接管，不存在锁定。',
      delivers: ['7×24 值守', '季度运行报告', '知识移交与培训'],
    },
  ],
}

export const caseShowcase = {
  heading: {
    eyebrow: 'Case studies',
    title: '金牌案例：不展示截图，展示闭环',
    desc: '每个案例都按「任务挑战 → 技术方案 → 数据成果」拆开写。你看到的不只是做了什么，还有为什么这么做、以及最终带来了什么数字。',
  },
  allLink: '全部 {count} 个案例',
  readFull: '阅读完整案例',
  loopTitle: '交付闭环',
}

export const cta = {
  badge: '开始合作',
  title: '先做一次 45 分钟的系统健康度评估',
  desc: '不需要采购流程，也不需要现场部署。给我们一个只读接入方式，7 天内你会拿到一份可以拿给管理层看的风险报告——报告里只有你系统里真实存在的问题，没有产品清单。',
  primary: '预约评估',
  points: ['无需现场部署', '只读接入，不改配置', '报告可直接提交管理层'],
}

/** 首屏控制台示意图内的仿真文案 */
export const consoleMock = {
  ariaLabel: '廷宣安全运营控制台界面示意',
  url: 'console.tingxuan.cn/overview',
  logoChar: '廷',
  workspace: '港口枢纽 · 生产',
  nav: [
    { label: '运营总览', active: true },
    { label: '设备资产' },
    { label: '策略中心' },
    { label: '升级任务' },
    { label: '告警事件' },
    { label: '审计日志' },
  ],
  dutyTitle: '值守状态',
  dutyStatus: '7×24 · 2 人在线',
  dutySla: '本季度 SLA 99.99%',
  overviewTitle: '安全运营总览',
  updatedAt: '数据更新于 14:02:11 · 全量设备',
  timeRanges: ['24h', '7d', '30d'],
  stats: [
    { label: '在线设备', value: '200,412', delta: '+0.4%', tone: 'text-jade' },
    { label: '今日拦截', value: '1,284', delta: '全部阻断', tone: 'text-muted' },
    { label: '平均时延', value: '62', unit: 'ms', delta: '低于阈值', tone: 'text-muted' },
  ],
  chartTitle: '合规流量 / 阻断流量',
  chartLegendAllow: '放行',
  chartLegendBlock: '阻断',
  topologyTitle: '接入拓扑',
  events: [
    { time: '14:02', text: '未登记设备尝试接入 · 堆场 A', tag: '已阻断', tone: 'rose' },
    { time: '13:47', text: '固件批次 #A21 灰度至 10%', tag: '进行中', tone: 'blue' },
    { time: '13:20', text: '证书轮换完成 · 1,208 台', tag: '成功', tone: 'jade' },
  ],
}

export default {
  hero,
  painShift,
  serviceSplit,
  capabilityGrid,
  process,
  caseShowcase,
  cta,
  consoleMock,
}
