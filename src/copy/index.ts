import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: { 'zh-CN': zhCN },
})

/**
 * 全站文案树统一出口，组件一律 `import { copy } from '@/copy'` 使用。
 * 纯文案直接对象访问（copy.contact.title，强类型且不受 message 语法中 @ / { } 等特殊字符影响）；
 * 带插值的句子用 useI18n() 的 t()（如 t('contact.successTitle', { name })）。
 * 当前站点单语言，直接引用 zh-CN；未来多语言在此按 locale 切换并保持结构同构。
 */
export const copy = zhCN
export type Copy = typeof zhCN
