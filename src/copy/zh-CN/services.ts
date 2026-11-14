/** 服务能力页：两大业务支柱、能力卡与差异点 */

export interface ServiceCapability {
  id: string
  title: string
  summary: string
  bullets: string[]
  outcome: string
  /** outcome 的短版，用于卡片角标（原实现按中文逗号 split 取首段，改为显式字段避免文案改版破坏展示） */
  outcomeShort: string
}

export interface ServicePillar {
  key: 'software' | 'iot'
  eyebrow: string
  title: string
  tagline: string
  summary: string
  audience: string
  capabilities: ServiceCapability[]
  stack: string[]
  sla: { label: string; value: string }[]
}

export const pillars: ServicePillar[] = [
  {
    key: 'software',
    eyebrow: 'Software & IT Services',
    title: '软件与信息技术服务',
    tagline: '把运维成本，换成可被审计的确定性',
    summary:
      '面向核心业务系统的托管运维、架构演进与合规改造。我们接管的不只是服务器，而是「业务不中断」这件事本身——用变更管控、容量模型与灾备演练，把不可控的偶发故障压缩成可预测的日常。',
    audience: '适用于 CTO / CIO 关注的核心系统稳定性、遗留系统改造与等保合规落地。',
    capabilities: [
      {
        id: 'managed-ops',
        title: '关键系统运维托管',
        summary: '7×24 小时值守、变更评审、容量预测与季度灾备演练，形成一套可审计的稳定性体系。',
        bullets: [
          'SLA 99.99%，故障响应 5 分钟内进入作战室',
          '变更双人复核 + 灰度发布，回滚窗口 ≤ 3 分钟',
          '每季度真实切换演练，灾备不是纸面方案',
        ],
        outcome: '客户年平均非计划停机时间，由 11.4 小时降至 0.6 小时',
        outcomeShort: '客户年平均非计划停机时间',
      },
      {
        id: 'modernization',
        title: '遗留系统现代化改造',
        summary: '对运行十年以上的单体系统做渐进式拆分，业务不重写、停机窗口归零，边跑边换引擎。',
        bullets: [
          '绞杀者模式（Strangler）逐步替换，不做一次性大爆炸重构',
          '双写与流量镜像保证数据一致性可验证',
          '改造期间业务连续可用，无需长停机窗口',
        ],
        outcome: '某城商行核心系统改造期间，零停机、零数据回滚',
        outcomeShort: '某城商行核心系统改造期间',
      },
      {
        id: 'compliance',
        title: '安全合规与等保落地',
        summary: '从差距评估到整改实施再到测评陪跑，把等保 2.0 三级与数据分类分级做成常态化能力。',
        bullets: [
          '资产测绘 → 差距分析 → 整改实施 → 测评整改闭环',
          '数据分类分级与最小权限模型同步落地',
          '全量操作留痕，审计报告一键导出',
        ],
        outcome: '平均 8 周完成三级测评整改，二次测评一次通过率 100%',
        outcomeShort: '平均 8 周完成三级测评整改',
      },
      {
        id: 'observability',
        title: '可观测性体系建设',
        summary: '指标、日志、链路三合一，让「系统慢了」从主观描述变成可定位的数字证据。',
        bullets: [
          '全链路追踪覆盖核心交易路径',
          '告警降噪，无效告警量下降 82%',
          '故障根因平均定位时间从 18 分钟压缩到 90 秒',
        ],
        outcome: '运维团队人均可管理实例数提升 3.2 倍',
        outcomeShort: '运维团队人均可管理实例数提升 3.2 倍',
      },
    ],
    stack: ['Kubernetes', 'OpenTelemetry', 'Prometheus', 'Terraform', 'PostgreSQL', 'Kafka'],
    sla: [
      { label: '响应时间', value: '≤ 5 min' },
      { label: '可用性', value: '99.99%' },
      { label: '值守', value: '7×24' },
    ],
  },
  {
    key: 'iot',
    eyebrow: 'IoT Security',
    title: '物联网安全解决方案',
    tagline: '让二十万台设备，像一台设备那样可控',
    summary:
      '从设备出厂到退役的全生命周期安全：一机一证的身份体系、边缘侧的协议适配与策略执行、端到端的固件签名与灰度升级。解决的不是「能不能连上」，而是「连上的是不是它、它被允许做什么」。',
    audience: '适用于工业制造、能源、医疗、园区等大规模设备接入场景。',
    capabilities: [
      {
        id: 'device-identity',
        title: '设备身份与零信任接入',
        summary: '为每台设备签发唯一身份证书，双向认证 + 动态授权，影子设备无法冒充合法节点。',
        bullets: [
          '一机一证，证书生命周期自动轮换',
          'mTLS 双向认证，拒绝共享密钥的批量风险',
          '按设备画像动态下发最小访问策略',
        ],
        outcome: '非法接入尝试拦截率 100%，冒充攻击零成功',
        outcomeShort: '非法接入尝试拦截率 100%',
      },
      {
        id: 'edge-gateway',
        title: '边缘安全网关',
        summary: '在弱网、断网的现场侧完成协议适配、数据缓冲与本地策略执行，云端失联业务照常运行。',
        bullets: [
          '支持 Modbus / OPC-UA / MQTT / BACnet 等 12 类工业协议',
          '断网续传，边缘侧最长 30 天数据留存',
          '策略本地执行，无需等待云端决策往返',
        ],
        outcome: '弱网环境下数据完整率由 91% 提升至 99.97%',
        outcomeShort: '弱网环境下数据完整率由 91% 提升至 99.97%',
      },
      {
        id: 'ota',
        title: '固件签名与 OTA 灰度',
        summary: '固件签名校验、分批灰度、失败自动回滚，让几十万台设备的升级从「不敢动」变成「照常做」。',
        bullets: [
          '全链路签名校验，阻断被篡改的固件包',
          '按批次灰度 1% → 10% → 全量，异常自动熔断',
          '升级失败自动回滚至上一稳定版本',
        ],
        outcome: '20 万台设备全量升级，耗时 72 小时，失败率 0.03%',
        outcomeShort: '20 万台设备全量升级',
      },
      {
        id: 'asset-detection',
        title: '资产测绘与异常检测',
        summary: '自动发现未被登记的影子设备，基于行为基线识别异常通信，把「不知道有什么」变成「全都知道」。',
        bullets: [
          '被动流量 + 主动探测双通道测绘',
          '行为基线建模，偏离即告警',
          '与 CMDB、工单系统双向同步',
        ],
        outcome: '首轮盘点即发现 1,400+ 台未登记设备',
        outcomeShort: '首轮盘点即发现 1,400+ 台未登记设备',
      },
    ],
    stack: ['MQTT 5.0', 'CoAP', 'mTLS', 'OPC-UA', 'eBPF', 'Edge Runtime'],
    sla: [
      { label: '接入时延', value: '< 80 ms' },
      { label: '单集群容量', value: '50 万设备' },
      { label: '边缘可用性', value: '99.95%' },
    ],
  },
]

export interface Differentiator {
  title: string
  summary: string
  marker: string
}

export const differentiators: Differentiator[] = [
  {
    marker: '01',
    title: '先算商业账，再谈技术栈',
    summary:
      '每次方案评审的第一个议题是「这次改造能减少多少停机成本、多少人力投入」，而不是选哪个中间件。技术服务于账本。',
  },
  {
    marker: '02',
    title: '交付的是体系，不是人月',
    summary:
      '所有值守流程、应急预案、变更规范都沉淀为可移交的文档与自动化脚本。合作结束时，客户团队能独立接管。',
  },
  {
    marker: '03',
    title: '数据说话，拒绝形容词',
    summary:
      '稳定性用连续运行天数说话，安全用拦截率说话，效率用平均定位时间说话。每季度提供可核对的运行报告。',
  },
]

/** 服务能力页页头与章节文案 */
export const page = {
  hero: {
    eyebrow: 'Services',
    title: '服务能力：把「不出事」拆成可交付的动作',
    desc: '两条业务线覆盖企业的核心系统与现场设备。无论从哪一侧切入，交付的都是一套能移交给客户团队运行的体系，而不是一段长期依赖的关系。',
  },
  capabilityBadge: {
    software: 'Managed Service',
    iot: 'Security Engineering',
  },
  outcomePrefix: '实测结果 · ',
  stackLabel: '技术栈',
  principles: {
    eyebrow: 'Principles',
    title: '三条不太一样的工作方式',
  },
}

export default {
  pillars,
  differentiators,
  page,
}
