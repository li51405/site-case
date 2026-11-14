/**
 * zh-CN 文案总树：按模块分文件维护，在此汇总。
 * 未来新增语言时，平级新建如 en-US/ 目录并提供同构模块，再在 src/copy/index.ts 切换。
 */
import brand from './brand'
import home from './home'
import services from './services'
import cases from './cases'
import technology from './technology'
import contact from './contact'
import routes from './routes'
import common from './common'

const zhCN = { brand, home, services, cases, technology, contact, routes, common }

export default zhCN
export type ZhCN = typeof zhCN
