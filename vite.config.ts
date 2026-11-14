import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import zhCN from './src/copy/zh-CN'

/** 将 index.html 中的 {{seo.*}} 占位符替换为 src/copy 中的 SEO 文案，避免品牌文案三处重复维护 */
function copySeoHtmlPlugin(): Plugin {
  const { seo, home } = zhCN.routes
  const siteName = zhCN.brand.brand.name
  return {
    name: 'copy-seo-html',
    transformIndexHtml(html: string) {
      return html
        .replace(/\{\{seo\.title\}\}/g, home.title)
        .replace(/\{\{seo\.description\}\}/g, seo.description)
        .replace(/\{\{seo\.ogDescription\}\}/g, seo.ogDescription)
        .replace(/\{\{seo\.keywords\}\}/g, seo.keywords)
        .replace(/\{\{seo\.siteName\}\}/g, siteName)
    },
  }
}

export default defineConfig({
  // 部署基路径：GitHub Pages 项目站点需设为 '/site-case/'（构建时 BASE_PATH=/site-case/ npm run build），
  // 常规 Nginx / 容器部署保持默认根路径 '/' 即可。
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), UnoCSS(), copySeoHtmlPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
  },
})
