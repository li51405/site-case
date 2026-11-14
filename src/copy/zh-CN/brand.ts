/** 品牌基础信息、导航、信任客户与首页指标 */

export interface NavItem {
  label: string
  to: string
  desc?: string
}

export const brand = {
  name: '廷宣科技',
  nameEn: 'TINGXUAN',
  slogan: '让关键系统，恒久在线',
  phone: '400-880-6600',
  phoneHref: 'tel:4008806600',
  email: 'contact@tingxuan.cn',
  address: '上海市浦东新区张江科学城 科苑路 88 号 廷宣大厦 12F',
  hours: '工作日 09:00 – 18:30 · 7×24 小时应急响应',
  since: 2014,
}

export const nav: NavItem[] = [
  { label: '首页', to: '/', desc: '全生命周期保护与核心能力概览' },
  { label: '服务能力', to: '/services', desc: '软件与信息技术 · 物联网安全解决方案' },
  { label: '成功案例', to: '/cases', desc: '金牌项目与长久运行数据' },
  { label: '技术底座', to: '/technology', desc: '通信协议与安全框架流程图' },
  { label: '联系我们', to: '/contact', desc: '项目咨询与预约演示' },
]

export const trustLogos = [
  '国家电网某省级公司',
  '招商局港口',
  '华东某城商行',
  '宁德新能源',
  '瑞金医院',
  '中车株洲所',
]

export interface Metric {
  value: number
  suffix: string
  decimals?: number
  label: string
  note: string
}

export const heroMetrics: Metric[] = [
  { value: 1286, suffix: '天', label: '核心平台连续运行', note: '自 2022 年上线以来无计划外中断' },
  { value: 0, suffix: '次', label: 'P1 级生产事故', note: '近 36 个月客户生产环境统计' },
  { value: 99.99, suffix: '%', decimals: 2, label: '托管服务 SLA', note: '年度实测可用性，含灾备切换' },
  { value: 20, suffix: '万+', label: '物联网设备在管', note: '覆盖 9 个行业、34 个城市' },
]

/** 顶栏文案（含带 {label} 插值的抽屉标题） */
export const header = {
  ariaHome: '返回首页',
  ariaNav: '主导航',
  ariaMenu: '打开菜单',
  contactCta: '联系我们',
  demoCta: '预约演示',
  current: '当前 · {label}',
  drawerCta: '预约 45 分钟系统健康度评估',
}

/** 页脚文案（columns 链接配置、联系方式标签、版权与法律条款） */
export const footer = {
  columns: [
    {
      title: '服务能力',
      links: [
        { label: '关键系统运维托管', to: '/services#managed-ops' },
        { label: '遗留系统现代化', to: '/services#modernization' },
        { label: '安全合规与等保', to: '/services#compliance' },
        { label: '可观测性体系', to: '/services#observability' },
      ],
    },
    {
      title: '解决方案',
      links: [
        { label: '设备身份与零信任', to: '/services#device-identity' },
        { label: '边缘安全网关', to: '/services#edge-gateway' },
        { label: '固件签名与 OTA', to: '/services#ota' },
        { label: '资产测绘与检测', to: '/services#asset-detection' },
      ],
    },
    {
      title: '了解我们',
      links: [
        { label: '客户案例', to: '/cases' },
        { label: '技术底座', to: '/technology' },
        { label: '交付流程', to: '/technology#framework' },
        { label: '联系与预约', to: '/contact' },
      ],
    },
  ],
  statusOk: '所有托管系统运行正常',
  hotlineLabel: '咨询热线',
  emailLabel: '项目邮箱',
  addressLabel: '办公地址',
  privacy: '隐私政策',
  terms: '服务条款',
  whitepaper: '安全白皮书',
  icp: '沪 ICP 备 2014000000 号',
  about: '{slogan}。自 {since} 年起为企业级客户提供系统安全与物联网安全交付服务。',
  copyrightMobile: '© {year} {name} · 保留所有权利 · {icp}',
  copyrightDesktop: '© {year} {name}（Tingxuan Technology）. 保留所有权利。',
}

export default {
  brand,
  nav,
  trustLogos,
  heroMetrics,
  header,
  footer,
}
