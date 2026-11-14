/** 路由 SEO 文案：每页 title/description 与站点兜底标题 */

export default {
  /** afterEach 兜底标题 */
  siteTitle: '廷宣科技',
  home: {
    title: '廷宣科技 | 企业级系统安全与物联网安全服务商',
    description: '让关键系统恒久在线。IT 系统安全运维托管、物联网安全接入与零信任架构落地。',
  },
  services: {
    title: '服务能力 | 廷宣科技',
    description:
      '软件与信息技术服务、物联网安全解决方案，覆盖运维托管、架构改造、合规落地与设备全生命周期安全。',
  },
  cases: {
    title: '成功案例 | 廷宣科技',
    description: '智慧港口、金融、新能源、医疗、轨道交通金牌案例，用连续运行天数与故障率说话。',
  },
  caseDetail: {
    title: '案例详情 | 廷宣科技',
  },
  technology: {
    title: '技术底座 | 廷宣科技',
    description: '五层通信协议栈与六步安全框架：资产可见、身份签发、最小授权、全程加密、行为审计、自动响应。',
  },
  contact: {
    title: '联系我们 | 廷宣科技',
    description: '预约一次 45 分钟的系统健康度评估，或直接与架构师沟通项目需求。敏感信息全程脱敏处理。',
  },
  notFound: {
    title: '页面不存在 | 廷宣科技',
  },
  /** index.html 首屏 SEO（构建期由 vite.config 注入，title 复用 home.title） */
  seo: {
    description:
      '廷宣科技为大型企业提供 IT 系统安全运维托管、物联网安全接入与零信任架构落地服务。连续运行 1286 天、P1 故障 0 次、7×24 小时响应，让关键业务系统恒久在线。',
    ogDescription:
      '把系统宕机风险、数据泄露风险与长期运维成本，转化为可被审计的确定性。12 年企业级交付经验，服务 300+ 关键业务系统。',
    keywords:
      '物联网安全,企业系统运维,IT 系统安全,零信任架构,安全运维托管,边缘设备接入,等保合规',
  },
}
