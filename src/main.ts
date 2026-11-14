import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './copy'
import { reveal } from './directives/reveal'
import 'uno.css'
import './styles/main.css'

const app = createApp(App)

// 截图 / E2E 模式：关闭平滑滚动、入场动画与所有过渡
if (typeof window !== 'undefined' && window.location.search.includes('noreveal')) {
  document.documentElement.style.scrollBehavior = 'auto'
  const style = document.createElement('style')
  style.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }'
  document.head.appendChild(style)
}

app.use(createPinia())
app.use(i18n)
app.use(router)
app.directive('reveal', reveal)
app.mount('#app')
