/** 技术底座页：五层协议栈、六步安全框架、原则与认证 */

export interface ProtocolLayer {
  layer: string
  title: string
  desc: string
  protocols: string[]
}

export const protocolLayers: ProtocolLayer[] = [
  {
    layer: 'L5',
    title: '应用与集成',
    desc: '对上以标准 API 与现有业务系统对接，不要求客户替换既有中台。',
    protocols: ['REST / gRPC', 'Webhook', 'OpenAPI 3.1', 'SAML / OIDC'],
  },
  {
    layer: 'L4',
    title: '平台与数据',
    desc: '设备影子、时序存储、规则引擎与策略中心，全部支持私有化部署。',
    protocols: ['MQTT 5.0 Broker', 'Kafka', 'ClickHouse', 'OPC-UA Server'],
  },
  {
    layer: 'L3',
    title: '边缘计算',
    desc: '协议适配、断网续传与本地策略执行，云端失联时业务继续运行。',
    protocols: ['Edge Runtime', 'eBPF', 'SQLite WAL', 'OTA Agent'],
  },
  {
    layer: 'L2',
    title: '网络与传输',
    desc: '双向认证与全链路加密，弱网环境下自动降级而非中断。',
    protocols: ['mTLS 1.3', 'WireGuard', 'CoAP / DTLS', '802.1X'],
  },
  {
    layer: 'L1',
    title: '设备与感知',
    desc: '覆盖 20 万台在管设备，含无法安装 Agent 的存量终端。',
    protocols: ['Modbus', 'BACnet', 'Zigbee / BLE', 'LoRaWAN'],
  },
]

export interface FrameworkStep {
  index: string
  title: string
  caption: string
  desc: string
  checkpoints: string[]
}

export const securityFramework: FrameworkStep[] = [
  {
    index: '01',
    title: '资产可见',
    caption: 'Visibility',
    desc: '先知道有什么。被动流量镜像加主动探测，在不触碰生产网的前提下建立设备基线。',
    checkpoints: ['七天内输出全量资产清单', '识别未登记与停止维护设备', '与 CMDB 双向同步'],
  },
  {
    index: '02',
    title: '身份签发',
    caption: 'Identity',
    desc: '一机一证。证书与设备指纹绑定，共享密钥方案全面退役。',
    checkpoints: ['唯一证书 + 设备指纹', '证书自动轮换', '不可安装 Agent 的终端建影子身份'],
  },
  {
    index: '03',
    title: '最小授权',
    caption: 'Least Privilege',
    desc: '默认拒绝，只放行确需的访问路径。策略按设备画像动态下发。',
    checkpoints: ['分区微隔离', '访问矩阵可审计', '策略随业务变更同步收敛'],
  },
  {
    index: '04',
    title: '全程加密',
    caption: 'Encryption',
    desc: '传输层 mTLS 1.3，固件层签名校验，存储层按字段加密。',
    checkpoints: ['双向证书校验', '固件签名链完整', '敏感字段落库加密'],
  },
  {
    index: '05',
    title: '行为审计',
    caption: 'Audit',
    desc: '每一次访问、每一次变更、每一次升级都留痕，可回溯到具体设备与操作人。',
    checkpoints: ['全量操作日志', '行为基线建模', '审计报告一键导出'],
  },
  {
    index: '06',
    title: '自动响应',
    caption: 'Response',
    desc: '异常触发自动隔离与工单闭环，人的注意力只留给真正需要判断的事。',
    checkpoints: ['异常设备自动隔离', '工单直达责任人', '演练常态化，预案不过期'],
  },
]

export interface Principle {
  title: string
  desc: string
}

export const principles: Principle[] = [
  {
    title: '私有化优先',
    desc: '核心组件全部支持本地部署，数据不出客户机房。不接受「只能上云」的架构约束。',
  },
  {
    title: '协议中立',
    desc: '不绑定单一厂商生态。任何符合规范的设备都应能被纳管，而不是被迫替换。',
  },
  {
    title: '可移交',
    desc: '交付物包含完整运行手册与自动化脚本。客户团队随时可以独立接管，不存在锁定。',
  },
  {
    title: '渐进式改造',
    desc: '不做一次性大爆炸重构。每一步都可以停下来、回退，且业务始终在线。',
  },
]

export interface CertItem {
  name: string
  detail: string
}

export const certifications: CertItem[] = [
  { name: 'ISO/IEC 27001', detail: '信息安全管理体系认证' },
  { name: 'ISO/IEC 27701', detail: '隐私信息管理体系认证' },
  { name: 'CSMM 三级', detail: '软件能力成熟度模型三级' },
  { name: '等保测评合作方', detail: '具备三级整改实施经验' },
]

/** 技术底座页页头与章节文案 */
export const page = {
  hero: {
    eyebrow: 'Technology',
    title: '技术底座：五层协议，六步闭环',
    desc: '我们不隐藏架构。下面这张图就是交付时实际部署的结构——每一层、每一个协议、每一个安全检查点都可以拿出来讨论。',
  },
  heroPoints: ['支持私有化部署', '协议中立，不锁定厂商', '全部组件可移交'],
  stack: {
    eyebrow: 'Protocol stack',
    title: '通信协议分层',
    desc: '从设备侧到应用侧共五层。层与层之间通过明确接口解耦，因此可以只替换其中一层——比如保留既有设备、只替换接入与身份层。',
    graphNote: '节点 · 链路 · 数据流向示意',
    layerLabel: 'Layer',
  },
  framework: {
    eyebrow: 'Security framework',
    title: '六步安全闭环',
    desc: '安全不是一次性的加固，而是一个持续运转的循环。六步按顺序推进，任何一步缺失，后面的努力都会失效——尤其是第一步「资产可见」。',
  },
  principles: {
    eyebrow: 'Principles',
    title: '四条架构原则',
    desc: '这些原则有时会让我们丢掉订单——比如客户希望「全部上某家云」。但我们认为，架构选择不应该由商务关系决定。',
  },
  certsTitle: '资质与认证',
}

export default {
  protocolLayers,
  securityFramework,
  principles,
  certifications,
  page,
}
