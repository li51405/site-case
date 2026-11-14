/** 成功案例：筛选行业、案例全量数据与查询 */

export interface CaseMetric {
  value: string
  label: string
}

export interface CaseStep {
  phase: string
  title: string
  detail: string
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  /** client 的短版（客户名），用于面包屑等紧凑展示（原实现按「·」split 取首段，改为显式字段） */
  clientShort: string
  industry: string
  year: string
  duration: string
  tone: 'blue' | 'jade' | 'amber' | 'rose'
  tags: string[]
  excerpt: string
  challenge: string[]
  solution: CaseStep[]
  results: CaseMetric[]
  quote: { text: string; author: string; role: string }
  stack: string[]
  featured?: boolean
}

export const industries = ['全部', '智慧港口', '金融', '新能源', '医疗', '轨道交通'] as const

export const cases: CaseStudy[] = [
  {
    slug: 'smart-port-zero-trust',
    title: '二十万台设备的统一安全接入',
    client: '招商局港口 · 华南某枢纽港',
    clientShort: '招商局港口',
    industry: '智慧港口',
    year: '2022 – 至今',
    duration: '14 周交付，持续托管',
    tone: 'blue',
    tags: ['零信任接入', '设备身份', '边缘网关'],
    excerpt:
      '把桥吊、集卡、闸口、冷链等七类异构设备收敛到一套身份体系里，让 20 万台设备在同一个策略平面上被看见、被授权、被审计。平台自 2022 年上线以来连续运行 1,286 天。',
    challenge: [
      '现场设备跨越七类协议、五个厂商体系，其中 38% 的设备无法安装任何 Agent，资产台账长期失准。',
      '生产网与办公网历史上存在隐性互通，一次误接入就可能让桥吊控制系统暴露在非受控网络中。',
      '港口 24 小时作业，任何停机检修窗口都意味着泊位排队与直接的经济损失，因此不接受「停机改造」。',
    ],
    solution: [
      {
        phase: 'Phase 01',
        title: '七天完成全量测绘',
        detail:
          '以被动流量镜像为主、主动探测为辅，在不触碰生产网的前提下建立设备资产基线，首轮即发现 1,400 余台未登记设备，其中 27 台为已被厂商停止维护的旧型号。',
      },
      {
        phase: 'Phase 02',
        title: '一机一证的身份体系',
        detail:
          '为每台设备签发独立证书并绑定设备指纹（型号、固件哈希、物理位置），用 mTLS 替代原有的共享密钥方案，证书轮换全自动完成，无需现场停机。',
      },
      {
        phase: 'Phase 03',
        title: '边缘侧策略执行',
        detail:
          '在泊位、堆场、闸口部署边缘网关，将协议适配与访问策略下沉到现场。云端链路中断时，本地策略继续生效，作业不因网络抖动而停摆。',
      },
      {
        phase: 'Phase 04',
        title: '从告警到工单的闭环',
        detail:
          '异常通信与影子设备接入直接生成工单，与既有 ITSM 打通，每一条告警都有责任人和关闭时间，避免「告警即噪音」。',
      },
    ],
    results: [
      { value: '1,286', label: '天连续运行' },
      { value: '100%', label: '非法接入拦截率' },
      { value: '1,400+', label: '首轮发现未登记设备' },
      { value: '0', label: '改造期间停机小时' },
    ],
    quote: {
      text: '过去我们最怕的不是设备坏，是不知道坏在哪、还有多少台没被管到。现在打开面板，每一台设备是谁、在哪、被允许做什么，都是有据可查的。',
      author: '陈工',
      role: '港口信息中心 · 基础设施负责人',
    },
    stack: ['MQTT 5.0', 'mTLS', 'OPC-UA', 'eBPF', 'Edge Runtime', 'ClickHouse'],
    featured: true,
  },
  {
    slug: 'bank-core-managed-ops',
    title: '核心交易系统的零停机运维托管',
    client: '华东某城市商业银行',
    clientShort: '华东某城市商业银行',
    industry: '金融',
    year: '2021 – 至今',
    duration: '9 周接管，5 年托管',
    tone: 'jade',
    tags: ['运维托管', '灾备演练', '合规审计'],
    excerpt:
      '在监管要求与业务连续性双重约束下接管核心交易系统运维。接管后的第 11 个月完成首次真实灾备切换，业务感知中断 0 秒，年度非计划停机累计 0.6 小时。',
    challenge: [
      '核心系统建于 2013 年，单体架构、文档缺失，关键运维知识集中在两位即将退休的工程师身上。',
      '监管要求年度灾备切换演练必须真实发生，而此前从未做过生产流量级别的切换。',
      '日终批处理窗口固定，任何运维动作都必须落在凌晨 1:00 – 4:00 的窄窗口内。',
    ],
    solution: [
      {
        phase: 'Phase 01',
        title: '知识资产化',
        detail:
          '用 6 周时间把两位老工程师的经验拆解为 214 条运行手册条目与 68 个自动化检查脚本，让「他知道」变成「系统知道」。',
      },
      {
        phase: 'Phase 02',
        title: '变更双人复核',
        detail:
          '所有生产变更进入双人复核 + 预演环境验证流程，变更失败自动回滚，回滚窗口控制在 3 分钟以内。',
      },
      {
        phase: 'Phase 03',
        title: '真实灾备切换',
        detail:
          '分三阶段推进：影子流量验证 → 只读业务切换 → 全量切换。每一步都有可回退的检查点，最终实现业务无感的双活切换。',
      },
      {
        phase: 'Phase 04',
        title: '合规报告自动化',
        detail:
          '全量操作留痕自动汇总为审计视图，季度与年度报告由系统生成，审计准备时间从 3 周压缩到 2 天。',
      },
    ],
    results: [
      { value: '0.6h', label: '年度非计划停机' },
      { value: '0 秒', label: '灾备切换业务中断' },
      { value: '214', label: '沉淀运行手册条目' },
      { value: '2 天', label: '审计报告准备周期' },
    ],
    quote: {
      text: '我们一开始担心的是把核心系统交给外部团队。真正让我们放心的，是他们先把我们的人脑子里的东西写成了文档——这比任何 SLA 承诺都实在。',
      author: '李女士',
      role: '运营管理部 · 副总经理',
    },
    stack: ['Kubernetes', 'OpenTelemetry', 'Oracle', 'Kafka', 'Ansible'],
    featured: true,
  },
  {
    slug: 'new-energy-fleet-ota',
    title: '全球十二座工厂的固件统一升级',
    client: '宁德新能源 · 电池制造基地',
    clientShort: '宁德新能源',
    industry: '新能源',
    year: '2023 – 至今',
    duration: '11 周交付',
    tone: 'amber',
    tags: ['固件 OTA', '灰度发布', '设备身份'],
    excerpt:
      '12 座工厂、20 万台产线设备、7 个时区。过去一次固件升级要停机三天、靠现场工程师逐台操作；现在 72 小时内完成全量灰度，失败率 0.03%，且异常自动熔断。',
    challenge: [
      '设备来自 9 家厂商，固件格式与升级机制各不相同，历史升级依赖厂商工程师到场。',
      '产线精度设备对固件版本极度敏感，一次错误升级可能导致整批电芯报废。',
      '各基地时区不同，无法找到统一的停机窗口。',
    ],
    solution: [
      {
        phase: 'Phase 01',
        title: '统一固件仓库',
        detail:
          '为 9 家厂商的固件建立统一签名与索引规范，所有升级包在入库时完成签名校验与差分压缩，包体积平均下降 64%。',
      },
      {
        phase: 'Phase 02',
        title: '分批灰度与自动熔断',
        detail:
          '按 1% → 10% → 全量三批次推进，每批次采集关键工艺参数，与基线偏差超过阈值即自动暂停并回滚。',
      },
      {
        phase: 'Phase 03',
        title: '跨时区调度',
        detail:
          '升级任务按各基地的换班窗口自动排期，同一时刻只在一个基地执行，避免全球范围内的同时风险。',
      },
    ],
    results: [
      { value: '72h', label: '全量升级完成' },
      { value: '0.03%', label: '升级失败率' },
      { value: '64%', label: '固件包体积下降' },
      { value: '0', label: '因升级导致的批次报废' },
    ],
    quote: {
      text: '以前升级像做手术，要停机、要厂商来人、要写预案。现在它变成了一个排期任务，跟换班一样正常。',
      author: '王先生',
      role: '集团 IT · 制造系统架构师',
    },
    stack: ['MQTT 5.0', 'CoAP', 'Ed25519', 'S3', 'Kubernetes'],
  },
  {
    slug: 'hospital-iot-zerotrust',
    title: '医疗物联网的零信任改造',
    client: '瑞金医院 · 三甲综合院区',
    clientShort: '瑞金医院',
    industry: '医疗',
    year: '2023 – 2024',
    duration: '13 周交付',
    tone: 'rose',
    tags: ['零信任', '资产测绘', '等保三级'],
    excerpt:
      '输液泵、监护仪、影像设备、门禁与后勤系统共 1.1 万台终端分布在 6 栋楼里。改造后，任何设备访问任何系统都需要一次显式授权，且全程可追溯。',
    challenge: [
      '医疗设备厂商普遍拒绝安装第三方 Agent，也无法改造固件，安全能力只能在网络侧补齐。',
      '临床业务不能中断，改造只能在夜间门诊结束后的 4 小时窗口内推进。',
      '既有网络中医疗设备、办公终端与访客 WiFi 存在混用，横向移动风险高。',
    ],
    solution: [
      {
        phase: 'Phase 01',
        title: '微隔离分区',
        detail:
          '在不改动终端的前提下，按临床科室与设备类型划分 42 个微隔离分区，默认拒绝跨区访问，仅放行确需的白名单流量。',
      },
      {
        phase: 'Phase 02',
        title: '设备指纹识别',
        detail:
          '基于流量特征识别设备类型与厂商，为无法安装 Agent 的终端建立影子身份，纳入统一策略平面。',
      },
      {
        phase: 'Phase 03',
        title: '等保三级同步落地',
        detail: '改造过程同步输出等保三级所需的资产清单、访问矩阵与审计记录，测评一次通过。',
      },
    ],
    results: [
      { value: '1.1 万', label: '终端纳入管控' },
      { value: '42', label: '微隔离分区' },
      { value: '一次通过', label: '等保三级测评' },
      { value: '4h', label: '单次改造窗口' },
    ],
    quote: {
      text: '最难的是不动设备、不动业务还要把安全做上去。他们确实做到了只改网络侧。',
      author: '张先生',
      role: '信息中心 · 安全主管',
    },
    stack: ['eBPF', 'VXLAN', '802.1X', 'Syslog', 'Elasticsearch'],
  },
  {
    slug: 'rail-edge-gateway',
    title: '轨交信号系统的边缘容灾',
    client: '中车株洲所 · 某市域铁路线',
    clientShort: '中车株洲所',
    industry: '轨道交通',
    year: '2024 – 至今',
    duration: '10 周交付',
    tone: 'blue',
    tags: ['边缘计算', '断网续传', '协议适配'],
    excerpt:
      '市域铁路沿线 46 个站点，隧道内网络抖动频繁。边缘网关在链路中断时接管本地决策，数据在恢复后按序补传，调度侧不再出现「数据空洞」。',
    challenge: [
      '隧道区间 4G/5G 信号频繁切换，单次中断最长 11 分钟。',
      '信号系统使用私有协议，与云端数据模型不兼容。',
      '任何数据丢失都可能影响行车日志的完整性追溯。',
    ],
    solution: [
      {
        phase: 'Phase 01',
        title: '协议适配层',
        detail: '为私有协议编写适配驱动，将原始报文映射到统一数据模型，云端无需感知底层协议差异。',
      },
      {
        phase: 'Phase 02',
        title: '本地决策接管',
        detail:
          '边缘节点在链路中断时按预置策略独立运行，本地留存 30 天数据，恢复后按时间序补传并做幂等去重。',
      },
    ],
    results: [
      { value: '99.97%', label: '数据完整率' },
      { value: '46', label: '沿线站点覆盖' },
      { value: '11 min', label: '最长断网自愈' },
      { value: '< 80ms', label: '端到端时延' },
    ],
    quote: {
      text: '数据不再有洞，这是我们做行车分析的前提。',
      author: '刘工',
      role: '信号系统 · 技术负责人',
    },
    stack: ['MQTT 5.0', 'Edge Runtime', 'SQLite', 'Protobuf'],
  },
]

export const featuredCases = cases.filter((item) => item.featured)

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug)
}

/** 案例列表页文案 */
export const page = {
  hero: {
    eyebrow: 'Case studies',
    title: '成功案例：用运行天数说话',
    desc: '我们只展示可以核对的项目：客户所属行业、交付周期、上线时间都是真实的，指标来自客户生产环境的运行记录。',
  },
  stats: {
    casesLabel: '公开金牌案例',
    industriesLabel: '覆盖行业',
    daysLabel: '最长连续运行 / 天',
  },
  viewLoop: '查看闭环',
}

/** 案例详情页文案 */
export const detail = {
  /** document.title 拼接后缀 */
  titleSuffix: ' | 廷宣科技案例',
  breadcrumbAria: '面包屑',
  breadcrumbHome: '首页',
  breadcrumbCases: '成功案例',
  factTitle: '项目信息',
  factClient: '客户',
  factPeriod: '时间',
  factDuration: '周期',
  stackTitle: '技术栈',
  consultCta: '咨询同类方案',
  tocTitle: '本案例目录',
  /** 正文章节（目录从该数组派生） */
  sections: [
    { id: 'challenge', no: '01', title: '任务挑战', desc: '项目启动时，客户面对的三个真实约束。' },
    { id: 'solution', no: '02', title: '技术方案', desc: '按实际推进顺序拆解，每一步都可回退。' },
    { id: 'outcome', no: '03', title: '数据成果', desc: '以下指标来自客户生产环境运行记录，可申请核对。' },
    { id: 'voice', no: '04', title: '客户评价', desc: '' },
  ],
  nextPrefix: '下一个案例 · {industry}',
  nextView: '查看',
  notFound: {
    code: '404',
    title: '没有找到这个案例',
    desc: '案例可能已更新链接，或者你访问的地址有误。',
    back: '返回案例列表',
  },
}

export default {
  industries,
  cases,
  featuredCases,
  getCaseBySlug,
  page,
  detail,
}
