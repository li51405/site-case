/** 联系页：页头、联系方式、表单字段与校验、选项与预设话术、成功页；表单默认值与选项同源于此 */

export default {
  hero: {
    eyebrow: 'Contact',
    title: '先聊一次，再谈合作',
    desc: '无论是评估、选型还是纯粹的架构讨论，我们都愿意先花 45 分钟听你说。不需要准备材料，带上问题就够了。',
  },
  info: {
    title: '直接联系',
    hotlineLabel: '咨询热线',
    emailLabel: '项目邮箱',
    emailNote: '工作日 24 小时内回复',
    addressLabel: '办公地址',
  },
  nextSteps: {
    title: '提交之后会发生什么',
    items: [
      '1 个工作日内，架构师会先电话确认场景',
      '3 个工作日内，给出初步判断与建议路径',
      '如需评估，签署保密协议后开始只读接入',
    ],
  },
  privacy: {
    title: '信息处理说明',
    desc: '表单中的手机号、邮箱在系统内以脱敏形式展示与存储；仅用于本次项目沟通，不进入任何营销名单，不向第三方披露。',
  },
  form: {
    title: '项目咨询',
    requiredNote: '带 * 为必填项，其余可稍后补充。',
    fields: {
      name: { label: '姓名 *', placeholder: '怎么称呼你', error: '请填写姓名' },
      company: { label: '公司 *', placeholder: '公司或组织名称', error: '请填写公司名称' },
      role: { label: '职位', placeholder: '如 CTO / IT 负责人' },
      phone: { label: '手机 *', placeholder: '用于回电，展示时自动脱敏', error: '请填写 11 位有效手机号' },
      email: { label: '邮箱 *', placeholder: 'name@company.com', error: '请填写有效邮箱地址' },
    },
    topicLabel: '需求方向',
    scaleLabel: '项目规模',
    messageLabel: '需求描述',
    messageHint: '不确定写什么？选一个预设',
    messagePlaceholder: '当前系统规模、遇到的具体问题、期望的时间窗口……',
    consent: '我已阅读并同意《隐私政策》，理解我的联系方式将被脱敏处理后存储，仅用于本次项目沟通。',
    footerNote: '提交后 1 个工作日内回复 · 不进入营销名单',
    submit: '提交需求',
    submitting: '正在提交…',
  },
  /** 需求方向选项（inquiry store 的默认值同源于此） */
  topics: ['IT 系统运维托管', '物联网安全解决方案', '安全合规与等保', '边缘计算与协议适配', '其他'],
  /** 项目规模选项（inquiry store 的默认值同源于此） */
  scales: ['100 台以下', '100 – 1,000 台', '1,000 – 10,000 台', '10,000 台以上', '暂不确定'],
  presets: [
    {
      label: '我只想要一份评估报告',
      text: '我们希望先了解现有系统的风险情况，暂不涉及采购。希望能安排一次只读接入的评估，输出一份可提交管理层的报告。',
    },
    {
      label: '我们在做设备接入改造',
      text: '现场有大量异构设备需要统一纳管，目前缺乏统一身份与审计能力，希望了解分层改造的可行路径与大致周期。',
    },
    {
      label: '我们在准备等保测评',
      text: '今年需要完成等保三级测评，安全能力建设尚未成型，希望了解整改范围与最小可行方案。',
    },
  ],
  /** 通过 URL ?intent= 预填的话术 */
  prefill: {
    demoTopic: '物联网安全解决方案',
    demoMessage: '希望预约一次产品演示，重点了解设备身份体系与边缘网关的实际运行效果。',
    assessmentMessage: '希望预约 45 分钟系统健康度评估，了解现有系统的风险与改进优先级。',
  },
  success: {
    /** 标题：已收到，{name} */
    title: '已收到，{name}',
    /** 描述中的 {phone} 在模板中以脱敏号码高亮展示 */
    desc: '我们会在 1 个工作日内通过 {phone} 与你联系。以下为你提交的信息摘要（已脱敏）。',
    summary: {
      reference: '受理编号',
      company: '公司',
      topic: '需求方向',
      scale: '规模',
    },
    viewCases: '先看看同类案例',
    resubmit: '再提交一条需求',
  },
}
