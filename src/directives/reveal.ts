import type { Directive } from 'vue'

/**
 * v-reveal — 轻量滚动入场动画
 * 用法：v-reveal / v-reveal="120"（延迟毫秒）
 * 修饰符：v-reveal.left / v-reveal.right（横向入场）、v-reveal.scale（缩放入场）
 * 依赖 IntersectionObserver，仅在进入视口后触发一次。
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // ?noreveal=1 用于自动化截图 / E2E 测试时跳过入场动画
    if (reduced || !('IntersectionObserver' in window) || location.search.includes('noreveal')) return

    el.classList.add('reveal')
    if (binding.modifiers.left) el.classList.add('reveal-l')
    if (binding.modifiers.right) el.classList.add('reveal-r')
    if (binding.modifiers.scale) el.classList.add('reveal-scale')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-in')
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
  },
  unmounted(el) {
    const target = el as HTMLElement & { _revealObserver?: IntersectionObserver }
    target._revealObserver?.disconnect()
  },
}
